import api from "./api";

const eventservice = {
  createevent: async (eventData) => {
    const res = await api.post("/events", eventData);
    return res.data;
  },
  getAllevents: async () => {
    const res = await api.get("/events");
    return res.data;
  },
  geteventById: async (id) => {
    const res = await api.get(`/events/${id}`);
    return res.data;
  },
};

export default eventservice;