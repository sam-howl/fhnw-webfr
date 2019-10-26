package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import javax.validation.Valid;
import java.io.IOException;
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
        return "404";
    }

    @RequestMapping(params = "form", method = RequestMethod.GET)
    public String createForm(Model model) {
        model.addAttribute("questionnaire", new Questionnaire());
        return "questionnaires/create";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String createQuestionnaire(@Valid Questionnaire questionnaire, BindingResult result) {
        if(result.hasErrors()){
            return "questionnaires/create";
        }
        questionnaireRepository.save(questionnaire);
        return "redirect:/questionnaires";
    }

    @GetMapping(value="/{id}", params = "form")
    public String updateForm(@PathVariable String id, Model model){
        Optional<Questionnaire> questionnaire = questionnaireRepository.findById(id);
        if(questionnaire.isPresent()){
            model.addAttribute("questionnaire", questionnaire.get());
            return "questionnaires/update";
        }
        return "404";
    }

    @PutMapping(value="/{id}")
    public String updateQuestionnaire(@Valid Questionnaire questionnaire, BindingResult result){
        if(result.hasErrors()){
            return "questionnaires/update";
        }
        Optional<Questionnaire> q = questionnaireRepository.findById(questionnaire.getId());
        if(q.isPresent()){
            Questionnaire oldQuestionnaire = q.get();
            oldQuestionnaire.setTitle(questionnaire.getTitle());
            oldQuestionnaire.setDescription(questionnaire.getDescription());
            questionnaireRepository.save(oldQuestionnaire);
            return "redirect:/questionnaires";
        }
        return "404";
    }

    @DeleteMapping(value="/{id}")
    public String delete(@PathVariable String id){
        Optional<Questionnaire> questionnaire = questionnaireRepository.findById(id);
        if(questionnaire.isPresent()){
            questionnaireRepository.deleteById(id);
            return "redirect:/questionnaires";
        }
        return "404";
    }
}
