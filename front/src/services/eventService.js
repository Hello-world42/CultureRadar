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

  participate: async (eventId) => {
    return api.post(`/events/${eventId}/participate`);
  },
  unparticipate: async (eventId) => {
    return api.post(`/events/${eventId}/unparticipate`);
  },
};

export default eventservice;