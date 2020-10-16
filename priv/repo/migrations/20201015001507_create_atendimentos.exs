defmodule Abel.Repo.Migrations.CreateAtendimentos do
  use Ecto.Migration

  def change do
    create table(:atendimentos) do
      add :cliente, :text
      add :servico, :text
      add :entrada, :naive_datetime
      add :saida, :naive_datetime
      add :contato, :text
      add :valor, :float
      add :pago, :boolean, default: false, null: false

      timestamps()
    end

  end
end
