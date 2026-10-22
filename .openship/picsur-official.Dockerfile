# Rebuildable runtime patch; application files and inherited settings are retained.
FROM node@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS patched_node
FROM ghcr.io/caramelfur/picsur@sha256:209ce21d338cd7d9a1adc838a67695e903149359bf192359819607df1b3c4417
COPY --from=patched_node /usr/local/bin/node /usr/local/bin/node
COPY .openship/security/picsur-smoke.cjs /opt/hecate-security/smoke.cjs
LABEL io.hecate.security.node="22.23.4"
RUN node --expose-gc /opt/hecate-security/smoke.cjs
