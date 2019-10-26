package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/questionnaires")
public class QuestionnaireController {
    Logger logger = LogManager.getLogger(QuestionnaireController.class);
    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @RequestMapping(method = RequestMethod.GET)
    public String findAll(Model model)
            throws IOException {
        List<Questionnaire> qs = questionnaireRepository.findAll();
        logger.debug("Found: " + qs.size() + " Questionnaires!");
        model.addAttribute("questionnaires", qs); //whole model will be passed to html
        //questionnaires is used in html, qs is value
        return "questionnaires/list"; //Path to html file from "templates"
    }

    @GetMapping(value="/{id}")
    public String findById(@PathVariable String id, Model model) throws IOException {
        Optional<Questionnaire> q = questionnaireRepository.findById(id);
        if(q.isPresent()){
            logger.debug("Found the questionnaire");
            model.addAttribute("questionnaire", q.get()); //q.get !!!!! otherwise error!
            return "questionnaires/show";
        }
        logger.error("no questionnaire with this id found");
        return "error";
    }

    @RequestMapping(params = "form", method = RequestMethod.GET)
    public String createForm(Model model) {
        model.addAttribute("questionnaire", new Questionnaire());
        return "questionnaires/create";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String createQuestionnaire(Questionnaire questionnaire) {
        questionnaireRepository.save(questionnaire);
        return "redirect:/questionnaires";
    }
}
