package ru.Technopolis;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.Technopolis.model.ToDo;
import ru.Technopolis.model.ToDoDAO;

@Controller
public class Service {

   private ToDoDAO dao;

   @RequestMapping("/")
   public String index(Model model) {
      model.addAttribute("toDoItems", dao.getAll());
      return "index";
   }

   @Autowired //Dependency Injection
   public Service(ToDoDAO dao) {
      this.dao = dao;
   }

   @RequestMapping(value = "/create")
   public @ResponseBody /*Превращает в JSON*/
   ToDo create(@RequestParam String description) {
      return dao.create(description, false);
   }

   @RequestMapping(value = "/update")
   public @ResponseBody
   ToDo update(@RequestParam long id, @RequestParam String description, @RequestParam boolean checked) {
      return dao.update(id, description, checked);
   }

   @RequestMapping(value = "/delete")
   public @ResponseBody
   void delete(@RequestParam long id) {
      dao.delete(id);
   }

   @RequestMapping(value = "/list")
   public @ResponseBody
   Collection<ToDo> getAll() {
      return dao.getAll();
   }

}
