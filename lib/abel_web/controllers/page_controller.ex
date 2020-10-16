defmodule AbelWeb.PageController do
  use AbelWeb, :controller

  def index(conn, _params) do
  	token = get_csrf_token()
    render(conn, "index.html",%{token: token})
  end
end
