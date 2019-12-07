package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Optional;
import java.util.logging.LogManager;
import java.util.logging.Logger;

@Controller
@RequestMapping("/questionnaires")
public class QuestionnaireController {
    @Autowired
    private QuestionnaireRepository questionnaireRepository;
    //private final Logger logger = LogManager.getLogger(QuestionnaireController.class);

    @RequestMapping(method = RequestMethod.GET)
    public String findAll(Model model) throws IOException {
        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        model.addAttribute("questionnaires", questionnaires);
        //logger.debug("Found " + questionnaires.size() + " questionnaires");
        return "questionnaires/list";
    }

    @GetMapping(value="/{id}")
    public String findById(@PathVariable String id, Model model) throws IOException {
        Questionnaire questionnaire = questionnaireRepository.findById(id).get();
        Optional<Questionnaire> questionnaireOptional = questionnaireRepository.findById(id);
        if(questionnaireOptional.isPresent()){
            model.addAttribute("questionnaire", questionnaireOptional.get());
            return "questionnaires/show";
        } else {
            return "error";
        }
    }
}
