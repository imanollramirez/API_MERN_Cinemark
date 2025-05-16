import employeeModel from "../models/employees.js";

// Empty function array 
const employeesController = {};

// SELECT 
employeesController.getAllEmployees = async (req,res) => {  
    const movies = await employeesController.find();
    res.json(movies);
}

// DELETE
employeesController.deleteEmployees = async (req, res) => {
    const deletedemployees = await employeeModel.findByIdAndDelete(req.params.id);
      if (!deletedemployees) {
        return res.status(404).json({ message: "Employee wasn't found!" });
      }
      res.json({ message: "Employee deleted!"});
    };
    
    // UPDATE
    employeesController.updateEmployees = async (req, res) => {
      
      const { name, email, password, telephone, address,dui } = req.body;

      await employeeModel.findByIdAndUpdate(
        req.params.id,
        {
            name, email, password, telephone, address,dui 
        },
        { new: true }
      );
      res.json({ message: "Employe updateed!"});
    };

export default employeesController;