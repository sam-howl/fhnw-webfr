package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Controller
@RequestMapping("/hello")
public class HelloWorldController {
    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @RequestMapping(method = RequestMethod.GET)
    public void helloWorld(@RequestParam("name") String name, HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        PrintWriter writer = response.getWriter();
        writer.append("<html><head><title>HelloWorld</title></head><body>");
        writer.append("Hello " + name + "<br>");
        writer.append("You have " + questionnaires.size() + " questionnaires in your repo.");
        writer.append("</body></html>");
    }

//    @GetMapping(params = "name")
//    public @ResponseBody String helloWorld(@RequestParam("name") String name) throws IOException {
//        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
//        String message = "Hello " + name + "<br>" + "You have " + questionnaires.size() + " questionnaires in your repo.";
//        return message;
//    }
}
