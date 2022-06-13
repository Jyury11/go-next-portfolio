package http

// Response Httpレスポンス
type Response struct {
	Required string `json:"required,omitempty"`
	Message  string `json:"message,omitempty"`
}
