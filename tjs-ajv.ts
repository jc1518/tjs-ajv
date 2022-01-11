import Ajv from "ajv";
import * as fs from "fs";
import * as yaml from "js-yaml";
import * as path from "path";
import * as TJS from "typescript-json-schema";

type Result = {
  success: boolean;
  message: string;
  data: string;
};

// Read config file
export function readConfigFile(configFile: string): string {
  try {
    const config = yaml.load(fs.readFileSync(configFile, "utf8"));
    return JSON.stringify(config);
  } catch (e) {
    console.error("Failed to load config file.");
    throw new Error(JSON.stringify(e));
  }
}

// Load config file if exists
export function loadConfig(configFile: string): Result {
  if (fs.existsSync(configFile)) {
    const config = readConfigFile(configFile);
    return {
      success: true,
      message: `Config file ${configFile} is found.`,
      data: config,
    };
  } else {
    return {
      success: false,
      message: `Config file ${configFile} is missing.`,
      data: "",
    };
  }
}

// Generate json schema from Interface
export function generateSchema(interfaceFile: string, interfaceName: string) {
  const settings: TJS.PartialArgs = {
    required: true,
  };

  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
  };

  const program = TJS.getProgramFromFiles([interfaceFile], compilerOptions);

  const schema = TJS.generateSchema(program, interfaceName, settings);

  const schemaString = JSON.stringify(schema);

  // In case you are interested to know what the schema looks like
  fs.writeFileSync(path.join(__dirname, "./schema.json"), schemaString, "utf8");
  return JSON.parse(schemaString);
}

// Validate config against json schema
export function validateConfig(
  interfaceFile: string,
  interfaceName: string,
  config: string
): Result {
  const configSchema = generateSchema(interfaceFile, interfaceName);

  const ajv = new Ajv({ allErrors: true, strict: false });

  const validate = ajv.compile(configSchema);

  const valid = validate(JSON.parse(config));

  if (!valid) {
    return {
      success: false,
      message: "Config file validation failed!",
      data: JSON.stringify(validate.errors),
    };
  } else {
    return {
      success: true,
      message: "Config file validation passed!",
      data: "",
    };
  }
}
