/* lambda-wrapper.js */

const api = require("@opentelemetry/api");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { Resource } = require("@opentelemetry/resources");

api.diag.setLogger(new api.DiagConsoleLogger(), api.DiagLogLevel.ALL);

const provider = new NodeTracerProvider(
  {
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "nodejs-lambda-1"
    }),
  }
);
const traceExporter = new OTLPTraceExporter({
  url: 'https://otlp.nr-data.net:4318/v1/traces',
  headers: {
    "api-key": "<newrelic-licence-key>"
  }
});

const spanProcessor1 = new BatchSpanProcessor(traceExporter);

provider.addSpanProcessor(spanProcessor1);
provider.register();

registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-aws-lambda": {
        disableAwsContextPropagation: true,
      },
    }),
  ],
});