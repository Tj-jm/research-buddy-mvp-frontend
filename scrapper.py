import requests
from bs4 import BeautifulSoup
import json
import csv
import re
from urllib.parse import urljoin, urlparse
import time
from typing import List, Dict, Optional

class FacultyScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
    def get_page_content(self, url: str) -> Optional[BeautifulSoup]:
        """Fetch and parse the webpage content."""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None
    
    def extract_faculty_info(self, soup: BeautifulSoup, base_url: str) -> List[Dict]:
        """Extract faculty information using multiple strategies."""
        faculty_list = []
        
        # Strategy 1: Look for common faculty card/profile containers
        faculty_containers = self._find_faculty_containers(soup)
        
        for container in faculty_containers:
            faculty_info = self._extract_from_container(container, base_url)
            if faculty_info and faculty_info not in faculty_list:
                faculty_list.append(faculty_info)
        
        # Strategy 2: Look for structured data (JSON-LD, microdata)
        structured_data = self._extract_structured_data(soup)
        faculty_list.extend(structured_data)
        
        # Remove duplicates based on name or email
        faculty_list = self._remove_duplicates(faculty_list)
        
        return faculty_list
    
    def _find_faculty_containers(self, soup: BeautifulSoup) -> List:
        """Find potential faculty containers using various selectors."""
        selectors = [
            # Common class patterns for faculty profiles
            '[class*="faculty"]',
            '[class*="profile"]',
            '[class*="person"]',
            '[class*="staff"]',
            '[class*="member"]',
            '[class*="bio"]',
            '[class*="card"]',
            # Common ID patterns
            '[id*="faculty"]',
            '[id*="profile"]',
            # Semantic elements
            'article',
            '.row > div',
            '.col > div',
            # List items that might contain faculty
            'li[class*="faculty"]',
            'li[class*="profile"]',
        ]
        
        containers = []
        for selector in selectors:
            elements = soup.select(selector)
            for element in elements:
                # Check if element likely contains faculty info
                if self._looks_like_faculty_container(element):
                    containers.append(element)
        
        return containers
    
    def _looks_like_faculty_container(self, element) -> bool:
        """Determine if an element likely contains faculty information."""
        text = element.get_text().lower()
        
        # Look for academic titles
        academic_titles = ['professor', 'dr.', 'ph.d', 'assistant', 'associate', 'chair', 'director']
        has_title = any(title in text for title in academic_titles)
        
        # Look for email patterns
        has_email = '@' in text and '.edu' in text
        
        # Look for common faculty page indicators
        faculty_indicators = ['research', 'education', 'cv', 'publications', 'office', 'phone']
        has_indicators = sum(1 for indicator in faculty_indicators if indicator in text) >= 2
        
        # Check for images (faculty photos)
        has_image = element.find('img') is not None
        
        # Should have reasonable amount of text
        has_content = len(text.strip()) > 50
        
        return (has_title or has_email) and (has_indicators or has_image) and has_content
    
    def _extract_from_container(self, container, base_url: str) -> Dict:
        """Extract faculty information from a container element."""
        faculty_info = {}
        
        # Extract name (usually in headings or strong/bold text)
        name = self._extract_name(container)
        if name:
            faculty_info['name'] = name
        
        # Extract title/position
        title = self._extract_title(container)
        if title:
            faculty_info['title'] = title
        
        # Extract email
        email = self._extract_email(container)
        if email:
            faculty_info['email'] = email
        
        # Extract phone
        phone = self._extract_phone(container)
        if phone:
            faculty_info['phone'] = phone
        
        # Extract office/location
        office = self._extract_office(container)
        if office:
            faculty_info['office'] = office
        
        # Extract profile URL
        profile_url = self._extract_profile_url(container, base_url)
        if profile_url:
            faculty_info['profile_url'] = profile_url
        
        # Extract image URL
        image_url = self._extract_image_url(container, base_url)
        if image_url:
            faculty_info['image_url'] = image_url
        
        # Extract research areas/interests
        research = self._extract_research_areas(container)
        if research:
            faculty_info['research_areas'] = research
        
        return faculty_info if faculty_info else None
    
    def _extract_name(self, container) -> Optional[str]:
        """Extract faculty name from container."""
        # Try headings first
        for tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            heading = container.find(tag)
            if heading:
                name = heading.get_text(strip=True)
                if name and len(name.split()) >= 2:  # At least first and last name
                    return name
        
        # Try strong/bold text
        strong_tags = container.find_all(['strong', 'b'])
        for strong in strong_tags:
            text = strong.get_text(strip=True)
            if text and len(text.split()) >= 2 and not any(char.isdigit() for char in text):
                return text
        
        # Try links that might be names
        links = container.find_all('a')
        for link in links:
            text = link.get_text(strip=True)
            if text and len(text.split()) >= 2 and not any(char.isdigit() for char in text):
                return text
        
        return None
    
    def _extract_title(self, container) -> Optional[str]:
        """Extract faculty title/position."""
        text = container.get_text()
        
        # Common academic titles
        title_patterns = [
            r'(Professor|Prof\.)\s+[A-Za-z\s]+',
            r'(Assistant|Associate|Full)\s+Professor',
            r'(Chair|Director)\s+of\s+[A-Za-z\s]+',
            r'(Dr\.|PhD|Ph\.D\.)',
        ]
        
        for pattern in title_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0).strip()
        
        return None
    
    def _extract_email(self, container) -> Optional[str]:
        """Extract email address."""
        text = container.get_text()
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        match = re.search(email_pattern, text)
        return match.group(0) if match else None
    
    def _extract_phone(self, container) -> Optional[str]:
        """Extract phone number."""
        text = container.get_text()
        phone_patterns = [
            r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',
            r'\+?1[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
        ]
        
        for pattern in phone_patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(0).strip()
        
        return None
    
    def _extract_office(self, container) -> Optional[str]:
        """Extract office location."""
        text = container.get_text()
        office_patterns = [
            r'Office:?\s*([A-Z]{1,4}\s*\d+[A-Z]?)',
            r'Room:?\s*([A-Z]{1,4}\s*\d+[A-Z]?)',
            r'Location:?\s*([A-Z]{1,4}\s*\d+[A-Z]?)'
        ]
        
        for pattern in office_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1).strip()
        
        return None
    
    def _extract_profile_url(self, container, base_url: str) -> Optional[str]:
        """Extract profile page URL."""
        links = container.find_all('a', href=True)
        for link in links:
            href = link['href']
            full_url = urljoin(base_url, href)
            
            # Check if link text suggests it's a profile
            link_text = link.get_text().lower()
            if any(word in link_text for word in ['profile', 'bio', 'cv', 'more info']):
                return full_url
        
        # If no explicit profile link, return first link
        if links:
            return urljoin(base_url, links[0]['href'])
        
        return None
    
    def _extract_image_url(self, container, base_url: str) -> Optional[str]:
        """Extract faculty photo URL."""
        img = container.find('img')
        if img and img.get('src'):
            return urljoin(base_url, img['src'])
        return None
    
    def _extract_research_areas(self, container) -> Optional[str]:
        """Extract research areas/interests."""
        text = container.get_text()
        
        # Look for sections mentioning research
        research_patterns = [
            r'Research[:\s]+([^.]+\.)',
            r'Interests?[:\s]+([^.]+\.)',
            r'Areas?[:\s]+([^.]+\.)'
        ]
        
        for pattern in research_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1).strip()
        
        return None
    
    def _extract_structured_data(self, soup: BeautifulSoup) -> List[Dict]:
        """Extract faculty info from structured data (JSON-LD, microdata)."""
        faculty_list = []
        
        # Look for JSON-LD structured data
        scripts = soup.find_all('script', type='application/ld+json')
        for script in scripts:
            try:
                data = json.loads(script.string)
                if isinstance(data, dict) and data.get('@type') == 'Person':
                    faculty_list.append(self._parse_json_ld_person(data))
            except:
                continue
        
        return faculty_list
    
    def _parse_json_ld_person(self, data: Dict) -> Dict:
        """Parse JSON-LD person data."""
        return {
            'name': data.get('name'),
            'title': data.get('jobTitle'),
            'email': data.get('email'),
            'phone': data.get('telephone'),
            'profile_url': data.get('url'),
            'image_url': data.get('image'),
        }
    
    def _remove_duplicates(self, faculty_list: List[Dict]) -> List[Dict]:
        """Remove duplicate faculty entries."""
        seen = set()
        unique_faculty = []
        
        for faculty in faculty_list:
            # Use name and email as unique identifiers
            identifier = (faculty.get('name', ''), faculty.get('email', ''))
            if identifier not in seen and any(identifier):
                seen.add(identifier)
                unique_faculty.append(faculty)
        
        return unique_faculty
    
    def scrape_faculty(self, url: str) -> List[Dict]:
        """Main method to scrape faculty from a URL."""
        print(f"Scraping faculty from: {url}")
        
        soup = self.get_page_content(url)
        if not soup:
            return []
        
        faculty_list = self.extract_faculty_info(soup, url)
        
        print(f"Found {len(faculty_list)} faculty members")
        return faculty_list
    
    def save_to_json(self, faculty_list: List[Dict], filename: str = 'faculty.json'):
        """Save faculty data to JSON file."""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(faculty_list, f, indent=2, ensure_ascii=False)
        print(f"Saved faculty data to {filename}")
    
    def save_to_csv(self, faculty_list: List[Dict], filename: str = 'faculty.csv'):
        """Save faculty data to CSV file."""
        if not faculty_list:
            return
        
        fieldnames = set()
        for faculty in faculty_list:
            fieldnames.update(faculty.keys())
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=list(fieldnames))
            writer.writeheader()
            writer.writerows(faculty_list)
        print(f"Saved faculty data to {filename}")

# Example usage
if __name__ == "__main__":
    scraper = FacultyScraper()
    
    # Example URLs to test
    urls = [
        "https://engineering.tamu.edu/cse/profiles/index.html#Faculty",
        # Add more URLs as needed
    ]
    
    all_faculty = []
    
    for url in urls:
        try:
            faculty_data = scraper.scrape_faculty(url)
            all_faculty.extend(faculty_data)
            
            # Be respectful - add delay between requests
            time.sleep(2)
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
    
    # Save results
    if all_faculty:
        scraper.save_to_json(all_faculty, 'faculty_data.json')
        scraper.save_to_csv(all_faculty, 'faculty_data.csv')
        
        # Print summary
        print(f"\nScraping complete! Found {len(all_faculty)} total faculty members")
        for i, faculty in enumerate(all_faculty[:5], 1):  # Show first 5
            print(f"\n{i}. {faculty.get('name', 'N/A')}")
            print(f"   Title: {faculty.get('title', 'N/A')}")
            print(f"   Email: {faculty.get('email', 'N/A')}")
    else:
        print("No faculty data found.")


scraper = FacultyScraper()
faculty_data = scraper.scrape_faculty("https://engineering.tamu.edu/cse/profiles/index.html#Faculty")
scraper.save_to_csv(faculty_data)