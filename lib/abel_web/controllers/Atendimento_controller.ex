defmodule AbelWeb.AtendimentoController do
  use AbelWeb, :controller
  alias Abel.Atendimento
  import Ecto.Changeset



  def create(conn , params) do
  	
  	ret = params
  				|> Atendimento.create
  				|> IO.inspect

  	case ret do
  		
  		{:ok , _} -> json(conn, %{"result" => "ok"})
  		_ -> json(conn, %{"result" => "error"})

  	end			

  	

  end

  def all(conn , _paramns) do
  	

  	ret = Atendimento.all
  				|> Poison.encode!


  	json(conn , ret)			 

  end

  def delete(conn , %{"id" => id}) do

  	case id |> Atendimento.delete do
  		
  		{:ok , _} -> 	json(conn, %{"result" => "ok"})
  		_ -> json(conn, %{"result" => "error"})

  	end

	end

	def get(conn , %{"id" => id}) do
		
		ret = id
					|> Atendimento.get_by_id
					|> Poison.encode!


		json(conn , ret)			

	end

	def update(conn , params) do
		
		ret = params 
					|> Atendimento.update


  	case ret do
  		
  		{:ok , _} -> json(conn, %{"result" => "ok"})
  		_ -> json(conn, %{"result" => "error"})

  	end	

	end

  
end
