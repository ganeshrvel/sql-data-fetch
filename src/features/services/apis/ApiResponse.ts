export class ApiResponse<D> {
  public data: D | null = null;
  public error: string | null = null;

  get hasError(): boolean {
    return !!this.error;
  }

  get hasData(): boolean {
    return !!this.data;
  }

  constructor({
    data = null,
    error = null,
  }: {
    data?: D | null;
    error?: string | null;
  }) {
    this.data = data;
    this.error = error;
  }

  static data<D>(data: D | null): ApiResponse<D> {
    return new ApiResponse({ data });
  }

  static error<D>(error: string | null): ApiResponse<D> {
    return new ApiResponse({ error });
  }
}
