import * as path from "path";
import { loadConfig, validateConfig } from "../tjs-ajv";

const INTERFACE_FILE = path.join(__dirname, "./sample-interface.ts");
const CONFIG_FILE = path.join(__dirname, "./sample-config.yml");

console.log("Validating config file, please wait...");
const loadResult = loadConfig(CONFIG_FILE);

if (!loadResult.success) {
  console.error(loadResult.message);
  process.exit(1);
} else {
  const validateResult = validateConfig(
    INTERFACE_FILE,
    "Config",
    loadResult.data
  );
  if (!validateResult.success) {
    console.error(validateResult.message);
    console.error(validateResult.data);
    process.exit(1);
  } else {
    console.log("The config file is valid!");
  }
}
