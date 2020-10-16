defmodule Abel.Repo.Migrations.Obs do
  use Ecto.Migration

  def change do

  	alter table(:atendimentos) do
  		
  		add :observacao, :string	

  	end


  end
end
