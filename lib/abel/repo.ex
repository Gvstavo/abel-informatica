defmodule Abel.Repo do
  use Ecto.Repo,
    otp_app: :abel,
    adapter: Ecto.Adapters.Postgres
end
