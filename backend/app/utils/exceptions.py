class GeminiUnavailableError(Exception):
    pass


class ResponseParseError(Exception):
    pass


class GeminiServiceError(Exception):
    def __init__(self, message: str, *, retryable: bool = False) -> None:
        super().__init__(message)
        self.retryable = retryable
