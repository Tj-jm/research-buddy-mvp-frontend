import axios from "axios";
const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials: true, 
})

// ----------------------
// AUTH
// ----------------------

export const signup = (email, password) => {
  return api.post("/signup", { email, password });
};

export const login = (email, password) => {
  return api.post("/login", { email, password });
};

export const logout = () => {
  return api.post("/logout");
};

export const getCurrentUser = () => {
  return api.get("/me");
};

// User details
export const getUserDetails = () => api.get("/me", { withCredentials: true });

//
export const getPapers = (params={}) => api.get("/dashboard/papers", { params,withCredentials: true });
export const deletePaper = (id) =>
  api.delete(`/dashboard/papers/${id}`, { withCredentials: true });


export const savePaper = (formData) => {
  return api.post("/dashboard/papers", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};


// PDF Upload Endpopint

export const uploadPDF = (file, modelName)=>{
    const formData = new FormData()
     formData.append('pdf_file', file);    
  formData.append('model_name', modelName);

    return api.post(
        '/predict-pdf',
        formData,
        {
            headers:{
                "Content-Type":'multipart/form-data'
            }
        }
    )
}

// GET a paper by id
export const getPaperById = (id) => api.get(`/dashboard/papers/${id}`);

// Download paper file
export const downloadPaper = async (id) => {
  const res = await api.get(`/dashboard/papers/${id}/download`, {
    responseType: "blob",
  });
  
  // Extract filename from content-disposition header
  let filename = `paper_${id}.pdf`;
  const disposition = res.headers["content-disposition"];
  if (disposition && disposition.includes("filename=")) {
    filename = disposition
      .split("filename=")[1]
      .replace(/"/g, ""); // remove quotes
  }

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename); // ✅ use server filename
  document.body.appendChild(link);
  link.click();
  link.remove();
};



// Prediction for Text
export const predictAbstract = (modelName, abstract) => {
  return api.post('/predict', {
    model_name: modelName,
    abstract,
  });
};

export const extractKeywordsKeybert = (abstract) => {
  return api.post('/extract_keywords_text', { abstract });
};

export const extractKeywordsGemini = (abstract) => {
  return api.post('/extract_keywords_gemini', { abstract });
};

export const extractSummaryTransformer = (abstract) => {
  return api.post('/summarize', {
    abstract,
    model_name: 'bart',
  });
};

export const extractSummaryGemini = (abstract) => {
  return api.post('/summarize', {
    abstract,
    model_name: 'gemini',
  });
};

export const toggleFavorite = (id, favorite) =>
  api.put(`/dashboard/papers/${id}/favorite`, null, {
    params: { favorite },
    withCredentials: true,
  });

  // ----------------------
// FACULTY SCRAPER
// ----------------------

export const scrapeFaculty = (payload) => {
  return api.post("/faculty/scrape", payload);
};

export const downloadFacultyFile = async (file) => {
  const url = api.defaults.baseURL + file.url; 
  const res = await api.get(file.url, { responseType: "blob" });

  const blob = new Blob([res.data], { type: file.mimetype });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", file.filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};


// Save scrape
export const saveFacultyScrape = (payload) => {
  return api.post("/faculty-scrape-db/save", payload);
};

export const listFacultyScrapes = (params={}) =>
  api.get("/faculty-scrape-db/list", { params });

export const getFacultyScrapeById = (id) => {
  return api.get(`/faculty-scrape-db/${id}`);
};

export const deleteFacultyScrape = (id) => {
  return api.delete(`/faculty-scrape-db/${id}`);
};
