type ApiResponse = {
    status: boolean;
    message: string;
    data?: unknown;
  };
  
  async function apiRequest({
    baseUrl,
    url,
    body,
    get,
    options,
  }: {
    baseUrl?: string;
    url: string;
    body?: Record<string, unknown>;
    get?: boolean;
    options?: Record<string, unknown>;
  }): Promise<ApiResponse> {
    try {
      // Default options are marked with *
      const base = baseUrl || "localhost:8080";
      let config: Record<string, any> = {};
      config["headers"] = { "Content-Type": "application/json" };
      config["method"] = get ? "GET" : "POST";
      // var credentials = btoa(
      //   process.env.REACT_APP_BASE_AUTH_USERNAME +
      //     ":" +
      //     process.env.REACT_APP_BASE_AUTH_PASSWORD
      // );
  
      config["headers"] = { ...config.headers, ...options } || config.headers;
      if (body) config["body"] = JSON.stringify(body);
  
      const response = await fetch(base + "/" + url, config);
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson ? await response.json() : null;
  
      return { status: true, message: "Success", data };
    } catch (e: any) {
      return { status: false, message: e.message || "An error has occured" };
    }
  }
  
  export default apiRequest;
  