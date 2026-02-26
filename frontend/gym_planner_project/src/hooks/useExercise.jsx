import { useState, useEffect } from "react";
import { ExerciseAPI } from "../api/ExerciseAPI.js";

export const useExercise = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await ExerciseAPI.getExercises();
                setExercises(response.data);
            } catch (err) {
                setError(err.message || "Failed to fetch exercises");
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    return {
        exercises,
        loading,
        error
    };
};