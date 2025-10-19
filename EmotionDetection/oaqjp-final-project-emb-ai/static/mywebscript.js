/**
 * Emotion Detection Client
 * Handles form submission and API communication
 */

(function() {
    'use strict';

    const form = document.getElementById('emotionForm');
    const textarea = document.getElementById('textToAnalyze');
    const resultDiv = document.getElementById('result');

    /**
     * Display error message to user
     * @param {string} message - Error message to display
     */
    function showError(message) {
        resultDiv.className = 'error show';
        resultDiv.innerHTML = `
            <h3>Error</h3>
            <p>${message}</p>
        `;
    }

    /**
     * Display emotion analysis results
     * @param {Object} data - Emotion data from API
     */
    function showResults(data) {
        resultDiv.className = 'success show';
        resultDiv.innerHTML = `
            <h3>Emotion Analysis Results</h3>
            <ul>
                <li><strong>Anger:</strong> ${data.anger.toFixed(3)}</li>
                <li><strong>Disgust:</strong> ${data.disgust.toFixed(3)}</li>
                <li><strong>Fear:</strong> ${data.fear.toFixed(3)}</li>
                <li><strong>Joy:</strong> ${data.joy.toFixed(3)}</li>
                <li><strong>Sadness:</strong> ${data.sadness.toFixed(3)}</li>
            </ul>
            <p class="dominant">
                Dominant Emotion: ${data.dominant_emotion.toUpperCase()}
            </p>
        `;
    }

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    async function handleSubmit(e) {
        e.preventDefault();

        const text = textarea.value.trim();

        if (!text) {
            showError('Please enter text to analyze.');
            return;
        }

        try {
            const response = await fetch(
                `/emotionDetector?textToAnalyze=${encodeURIComponent(text)}`
            );

            const data = await response.json();

            if (data.error) {
                showError(data.error);
            } else {
                showResults(data);
            }
        } catch (error) {
            showError(`Network error: ${error.message}`);
        }
    }

    form.addEventListener('submit', handleSubmit);
})();