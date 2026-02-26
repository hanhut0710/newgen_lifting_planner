import axiosClient from "./axiosClient";

const getExercises = () => axiosClient.get("/exercises/");
const createExercise = (exerciseData) => axiosClient.post("/exercises/", exerciseData);

export const ExerciseAPI = {
    getExercises,
    createExercise,
};