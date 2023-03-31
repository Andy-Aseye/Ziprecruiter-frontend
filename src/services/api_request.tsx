type ApiResponse = {
    status: boolean;
    message: string;
    data?: unknown;
    ok?: boolean;
  };
  
  async function apiRequest({
    baseUrl,
    url,
    body,
    get,
    options,
    headers,
    queryParams,
    }: {
    baseUrl?: string;
    url: string;
    body?: Record<string, unknown>;
    get?: boolean;
    options?: Record<string, unknown>;
    headers?: Record<string, unknown>;
    queryParams?: string;
  }): Promise<ApiResponse> {
    try {
      // Default options are marked with *
      const base = baseUrl || "http://localhost:8080";
      let config: Record<string, any> = {};

      // allow us to pass custom headers
      if (headers) {
        config["headers"] = { ...config.headers, ...headers };
      } else {
        config["headers"] = { "Content-Type": "application/json" };
      }

      config["method"] = get ? "GET" : "POST";
      // var credentials = btoa(
      //   process.env.REACT_APP_BASE_AUTH_USERNAME +
      //     ":" +
      //     process.env.REACT_APP_BASE_AUTH_PASSWORD
      // );
  
      config["headers"] = { ...config.headers, ...options } || config.headers;
      if (body) config["body"] = JSON.stringify(body);
      console.log(body, config)
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
  