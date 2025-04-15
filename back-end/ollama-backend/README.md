# Hosting Gemma2:9b on Google Cloud Run with Ollama

This guide walks you through deploying the Gemma2:9b AI model using Ollama on Google Cloud Run. The process involves containerizing the model, pushing it to Google Container Registry, and deploying it as a serverless endpoint.

## Prerequisites

1. **Google CLoud Account:** Active account with billing enabled.
2. **Google Cloud SDK (gloud CLI):** Installed and authenticated (gcloud init).
3. **Docker:** Installed on your local machine.
4. Ollama: Installed locally (for testing/pulling models)


## Step-by-Step Guide

1. **Pull the Gemma2:9b Model Locally**
    - First, download the model using Ollama:

    ```sh
    ollama pull gemma:9b
    ```

    - Do Authentication

    ```sh
    gcloud init
    ```

    - Enable services

    ```sh
    gcloud services enable run.googleapis.com                   
    gcloud services enable containerregistry.googleapis.com
    gcloud services enable cloudbuild.googleapis.com
    ```

2. **Create a Dockerfile**
    - Create a file named Dockerfile with the following content

    ```sh
    FROM ollama/ollama:0.3.6

    # Listen on all interfaces, port 8080
    ENV OLLAMA_HOST 0.0.0.0:8080

    # Store model weight files in /models
    ENV OLLAMA_MODELS /models

    # Reduce logging verbosity
    ENV OLLAMA_DEBUG false

    # Never unload model weights from the GPU
    ENV OLLAMA_KEEP_ALIVE -1 

    # Store the model weights in the container image
    ENV MODEL gemma2:9b
    RUN ollama serve & sleep 5 && ollama pull $MODEL 

    # Start Ollama
    ENTRYPOINT ["ollama", "serve"]
    ```

3. **Build the DOcker Image**
    - Build the image and tag it for Google Container Registry:

    ```sh
    gcloud builds submit \
        --tag us-central1-docker.pkg.dev/[PROJECT-NAME]/ollama/ollama-gemma \ 
        --machine-type e2-highcpu-32
    ```

4. **Create service account**

    ```sh
    gcloud iam service-accounts create ollama \
        --display-name="Service Account for Ollama Cloud Run service"
    ```
5. **Run on google cloud**

    ```sh
    gcloud beta run deploy ollama-gemma \
        --image us-central1-docker.pkg.dev/[PROJECT-NAME]/ollama/ollama-gemma \
        --concurrency 4 \
        --cpu 8 \
        --set-env-vars OLLAMA_NUM_PARALLEL=4 \
        --max-instances 2 \
        --memory 32Gi \
        --no-allow-unauthenticated \
        --no-cpu-throttling \
        --service-account ollama@[PROJECT-NAME].iam.gserviceaccount.com \
        --timeout=600
    ```

6. **Accessing the Model**
    - Once deployed, you'll receive a Cloud Run URL (e.g., `https://gemma-9b-ollama-xyz.a.run.app`). Use it to send request

    - Example API request

    ```sh
    curl -X POST \
        https://gemma-9b-ollama-xyz.a.run.app/api/generate \
        -H "Content-Type: application/json" \
        -d '{
            "model": "gemma:9b",
            "prompt": "Explain quantum computing in 50 words.",
            "stream": false
        }'
    ```

Besides, you can follow steps from this youtube video and this website tutorials where we did learn from that:
- [Youtube video](https://www.youtube.com/watch?v=-ifJIIwZWZ8&ab_channel=MervinPraison) 
- [Website tutorial](https://mer.vin/2024/08/ollama-cloud-run-guide/)