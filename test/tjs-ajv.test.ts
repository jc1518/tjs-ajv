import * as path from "path";
import { loadConfig, validateConfig } from "../tjs-ajv";

test("Tes config file is found", () => {
  const configFile = path.join(__dirname, "./invalid-config.yml");
  const fileExist = loadConfig(configFile);
  expect(fileExist.success).toBeTruthy();
});

test("Test config file is missing", () => {
  const configFile = path.join(__dirname, "./config.yml");
  const fileExist = loadConfig(configFile);
  expect(!fileExist.success).toBeTruthy();
});

test("Test ted config file is valid", () => {
  const interfaceFile = path.join(__dirname, "../example/sample-interface.ts");
  const configFile = path.join(__dirname, "../example/sample-config.yml");
  const fileExist = loadConfig(configFile);
  const valid = validateConfig(interfaceFile, "Config", fileExist.data);
  expect(valid.success).toBeTruthy();
});

test("Test config file is invalid", () => {
  const interfaceFile = path.join(__dirname, "../example/sample-interface.ts");
  const configFile = path.join(__dirname, "./invalid-config.yml");
  const fileExist = loadConfig(configFile);
  const valid = validateConfig(interfaceFile, "Config", fileExist.data);
  expect(!valid.success).toBeTruthy();
  expect(valid.data).toContain(
    '{"instancePath":"/app_name","schemaPath":"#/properties/app_name/pattern","keyword":"pattern","params":{"pattern":"^[A-Za-z][A-Za-z0-9-]*$"},"message":"must match pattern \\"^[A-Za-z][A-Za-z0-9-]*$\\""}'
  );
  expect(valid.data).toContain(
    '{"instancePath":"/email","schemaPath":"#/properties/email/format","keyword":"format","params":{"format":"email"},"message":"must match format \\"email\\""}'
  );
  expect(valid.data).toContain(
    '{"instancePath":"/account_id","schemaPath":"#/properties/account_id/type","keyword":"type","params":{"type":"string"},"message":"must be string"}'
  );
  expect(valid.data).toContain(
    '{"instancePath":"/ecs_config/vpc_config","schemaPath":"#/definitions/VpcConfig/additionalProperties","keyword":"additionalProperties","params":{"additionalProperty":"db_subnet_id"},"message":"must NOT have additional properties"}'
  );
  expect(valid.data).toContain(
    '{"instancePath":"/ecs_config/vpc_config/interconnect_subnet_ids/0","schemaPath":"#/definitions/VpcConfig/properties/interconnect_subnet_ids/items/pattern","keyword":"pattern","params":{"pattern":"^subnet-[a-z0-9]*$"},"message":"must match pattern \\"^subnet-[a-z0-9]*$\\""}'
  );
  expect(valid.data).toContain(
    '{"instancePath":"/ecs_config/cpu_units","schemaPath":"#/properties/cpu_units/type","keyword":"type","params":{"type":"integer"},"message":"must be integer"}'
  );
  expect(valid.data).toContain(
    '{"instancePath":"/ecs_config/min_task","schemaPath":"#/properties/min_task/minimum","keyword":"minimum","params":{"comparison":">=","limit":1},"message":"must be >= 1"}'
  );
});
