package ch.fhnw.webfr.flashcard.web;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/questionnaires")
public class QuestionnaireController {
    @Autowired
    private QuestionnaireRepository questionnaireRepository;
    private final Logger logger = LogManager.getLogger(QuestionnaireController.class);

    @GetMapping
    public ResponseEntity<List<Questionnaire>> findAll(){
        Sort sort = Sort.by(Sort.Direction.ASC, "title");
        List<Questionnaire> q = questionnaireRepository.findAll(sort);
        logger.debug("Found: " + q.size());
        return new ResponseEntity<>(q, HttpStatus.OK);
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Questionnaire> findById(@PathVariable String id){
        Optional<Questionnaire> questionnaireOptional = questionnaireRepository.findById(id);
        if(questionnaireOptional.isPresent()){
            logger.debug("I find a questionnaire.");
            return new ResponseEntity<>(questionnaireOptional.get(), HttpStatus.OK);
        }
        logger.error("Questionnaire not found!");
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Questionnaire> create(@Valid @RequestBody Questionnaire q, BindingResult result){
        if(result.hasErrors()){
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        Questionnaire questionnaire = questionnaireRepository.save(q);
        return new ResponseEntity<>(questionnaire, HttpStatus.CREATED);
    }
}
