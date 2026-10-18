# Openship production deployment

This directory preserves the production deployment configuration after migration from Zeabur.
The Openship project follows the original deploy branch and uses `.openship/compose.yaml`.
Credentials, runtime environment, domains, and persistent volumes are managed in Openship; do not commit secrets here.
The Dockerfiles build native images on the deployment server.
