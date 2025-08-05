import Config from "./Config";

// type LogLevel = "log" | "info" | "warn" | "error" | "debug";

const logger = {
  log: (message?: any, ...optionalParams: any[]) => {
    if (Config.IS_LOG) {
      console.log(message, ...optionalParams);
    }
  },

  info: (message?: any, ...optionalParams: any[]) => {
    if (Config.IS_LOG) {
      console.info(message, ...optionalParams);
    }
  },

  warn: (message?: any, ...optionalParams: any[]) => {
    if (Config.IS_LOG) {
      console.warn(message, ...optionalParams);
    }
  },

  error: (message?: any, ...optionalParams: any[]) => {
    // 에러는 프로덕션에서도 로깅
    console.error(message, ...optionalParams);
  },

  share: (message?: any, ...optionalParams: any[]) => {
    console.log(message, ...optionalParams);
  },

  debug: (message?: any, ...optionalParams: any[]) => {
    if (Config.IS_LOG) {
      console.debug(message, ...optionalParams);
    }
  },

  // 객체를 예쁘게 출력
  table: (tableData: any, properties?: string[]) => {
    if (Config.IS_LOG) {
      console.table(tableData, properties);
    }
  },

  // 그룹화된 로그
  group: (label: string, fn: () => void) => {
    if (Config.IS_LOG) {
      console.group(label);
      fn();
      console.groupEnd();
    }
  },

  // API 로깅
  api: (method: string, url: string, data?: any) => {
    if (Config.IS_LOG) {
      console.log(method, url, data);
    }
  },
};

export default logger;
