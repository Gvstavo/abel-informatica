defmodule Abel.Atendimento do
  use Ecto.Schema
  import Ecto.Changeset
  alias Abel.Repo
  alias Abel.Atendimento

  schema "atendimentos" do
    field :cliente, :string
    field :contato, :string
    field :entrada, :naive_datetime
    field :pago, :boolean, default: false
    field :saida, :naive_datetime
    field :servico, :string
    field :valor, :float
    field :observacao, :string

    timestamps()
  end

  @doc false
  def changeset(atendimento, attrs) do
    atendimento
    |> cast(attrs, [:cliente, :servico, :entrada, :saida, :contato, :valor, :pago, :observacao])
   # |> validate_required([:cliente, :servico, :entrada, :saida, :contato, :valor, :pago])
  end

  def create(cliente) do
    
    changeset = cliente
                |> Map.update!("entrada" , fn x -> 

                  x
                  |> Date.from_iso8601!
                  |> NaiveDateTime.new(~T[00:00:00])
                  |> elem(1) 

                end)    
                |> Map.update!("saida" , fn x -> 

                  x
                  |> Date.from_iso8601!
                  |> NaiveDateTime.new(~T[00:00:00])
                  |> elem(1) 

                end) 
                |> Map.update!("pago", &Kernel.==(&1,"pago"))
                |> Map.update!("valor" , &Kernel.to_string(&1) |> Float.parse |> elem(0))

    %Atendimento{}
    |> Atendimento.changeset(changeset)          
    |> Repo.insert
                  


  end


  def get_by_id(id) do
    int_id = id 
              |> String.to_integer

    Atendimento
    |> Repo.get(int_id)

  end

  def update(cliente) do

    id = cliente
          |> Map.get("id")

    changeset = cliente
                |> Map.update!("entrada" , fn x -> 

                  x
                  |> Date.from_iso8601!
                  |> NaiveDateTime.new(~T[00:00:00])
                  |> elem(1) 

                end)    
                |> Map.update!("saida" , fn x -> 

                  x
                  |> Date.from_iso8601!
                  |> NaiveDateTime.new(~T[00:00:00])
                  |> elem(1) 

                end)
                |> Map.update!("pago", &Kernel.==(&1,"pago"))
                |> Map.update!("valor" , &Kernel.to_string(&1) |> Float.parse |> elem(0))
                |> Map.drop(["id"])
                |> Enum.map(fn {k,v} -> {String.to_atom(k),v} end) 
                |> Map.new

    Atendimento
    |> Repo.get(id)
    |> Ecto.Changeset.change(changeset)
    |> Repo.update
  




    

  end

  def delete(id) do

    int_id = id 
              |> String.to_integer
    
    Atendimento
    |> Repo.get(int_id)
    |> Repo.delete

  end

  def all do
    Atendimento
    |> Repo.all    

  end
end
