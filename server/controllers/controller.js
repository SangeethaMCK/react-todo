import { client } from '../server.js'

const getTodos = async (req, res) => {
      try {
        const todos = await client.query('SELECT * FROM todos');
        todos.rows.forEach(todo => {
          todo.date = formatDate(todo.date);
        });
        res.setStatusCode(200);
        res.setHeader('Content-Type', 'application/json');
        res.setBody(JSON.stringify(todos.rows));
        res.send();
      } catch (error) {
        console.error('Error fetching todos:', error);
        res.setStatusCode(500);
        res.setHeader('Content-Type', 'application/json');
        res.setBody(JSON.stringify({ error: 'Internal Server Error' }));
        res.send();
      }
  }

  const postTodos = async (req, res) => {    
    try {
        console.log("postTodos", req.body)
      const {id,  name, date, details, priority, completed } = req.body;
      await client.query('INSERT INTO todos (id, name, date, details, priority, completed) VALUES($1, $2, $3, $4, $5, $6)', [ id, name, date, details, priority, completed]);
      res.setStatusCode(201);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ message: 'Todo created successfully' }));
      res.send();
    } catch (error) {        
      console.error('Error creating todo:', error);
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ error: 'Internal Server Error' }));
      res.send();
    }
  }

  const deleteTodos = async (req, res) => {
    console.log('deleteTodos', req.body)
    try {
      await client.query(`truncate todos `);
      res.setStatusCode(200);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ message: "All Todo deleted successfully" }));
      res.send();
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ error: "Internal Server Error" }));
      res.send();
    }
  }

  const deleteTodosById = async (req, res) => { 
    console.log('deleteTodosById', req.params.id)   
    try {
      const id = req.params.id;
      await client.query(`delete from todos where id= ${id}`);
      res.setStatusCode(200);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ message: "Todo deleted successfully" }));
      res.send();
    }        
    catch (error) {
      console.error("Error deleting todo:", error);
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ error: "Internal Server Error" }));
      res.send();
    }
  }  

  const putTodosById = async (req, res) => {    
    try {
      const id = req.params.id;
      const {  name, date, details, priority, completed } = req.body
      await client.query('update todos set name=$1, date=$2, details=$3, priority=$4, completed=$5 where id=$6', [name, date, details, priority, completed, id])
      res.setStatusCode(200);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ message: "Todo updated successfully" }));
      res.send();
    }        
    catch (error) {
      console.error("Error updating todo:", error);
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ error: "Internal Server Error" }));
      res.send();
    }
  }      

  const patchTodosById = async (req, res) => {                
    try {        
      const id = req.params.id;
      const { completed } = req.body;
      await client.query('update todos set completed=$1 where id=$2', [completed, id])
      res.setStatusCode(200);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ message: "Todo updated successfully" }));
      res.send();
    }        
    catch (error) {
      console.error("Error updating todo:", error);
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ error: "Internal Server Error" }));
      res.send();
    }
  }              

  const getTodosByDate = async (req, res) => {    
    try {                        
      const sortedTodos = await client.query('SELECT * FROM todos ORDER BY date');                
      sortedTodos.rows.forEach(todo => {                                
        todo.date = formatDate(todo.date);
      });                
      res.setStatusCode(200);                
      res.setHeader('Content-Type', 'application/json');                
      res.setBody(JSON.stringify({ message: "Todos sorted by date", todos: sortedTodos.rows }));                
      res.send();            
    }        
    catch (error) {
      console.error("Error sorting todos by date:", error);
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ error: "Internal Server Error" }));
      res.send();
    }
  }  

  const getTodosByPriority = async (req, res) => {    
    try {                        
      const sortedTodos = await client.query('SELECT * FROM todos ORDER BY priority');                
      sortedTodos.rows.forEach(todo => {                                
        todo.date = formatDate(todo.date);
      });                
      res.setStatusCode(200);                
      res.setHeader('Content-Type', 'application/json');                
      res.setBody(JSON.stringify({ message: "Todos sorted by priority", todos: sortedTodos.rows }));                
      res.send();            
    }        
    catch (error) {
      console.error("Error sorting todos by priority:", error);
      res.setStatusCode(500);
      res.setHeader('Content-Type', 'application/json');
      res.setBody(JSON.stringify({ error: "Internal Server Error" }));
      res.send();
    }       
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }

export {
  getTodos,
  postTodos,
  deleteTodos,
  deleteTodosById,
  putTodosById,
  patchTodosById,
  getTodosByDate,
  getTodosByPriority,
}