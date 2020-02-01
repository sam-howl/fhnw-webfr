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

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Questionnaire>> findAll(){
        Sort sort = Sort.by(Sort.Direction.ASC, "title");
        List<Questionnaire> q = questionnaireRepository.findAll(sort);
        logger.debug("Found: " + q.size());
        return new ResponseEntity<>(q, HttpStatus.OK);
    }

    @CrossOrigin
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

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Questionnaire> create(@Valid @RequestBody Questionnaire q, BindingResult result){
        if(result.hasErrors()){
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        Questionnaire questionnaire = questionnaireRepository.save(q);
        return new ResponseEntity<>(questionnaire, HttpStatus.CREATED);
    }

    @CrossOrigin
    @PutMapping(value="/{id}")
    public ResponseEntity<Questionnaire> update(@PathVariable String id, @Valid @RequestBody Questionnaire q, BindingResult result){
        Optional<Questionnaire> questionnaireOptional = questionnaireRepository.findById(id);
        if(questionnaireOptional.isPresent()){
            logger.debug("I find a questionnaire.");
            if(result.hasErrors()){
                logger.debug("Values not according to preconditions");
                return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
            }
            Questionnaire questionnaire = questionnaireOptional.get();
            questionnaire.setTitle(q.getTitle());
            questionnaire.setDescription(q.getDescription());
            Questionnaire updated = questionnaireRepository.save(questionnaire);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        logger.error("Questionnaire not found!");
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin
    @DeleteMapping(value="/{id}")
    public ResponseEntity<Questionnaire> delete(@PathVariable String id){
        Optional<Questionnaire> questionnaireOptional = questionnaireRepository.findById(id);
        if(questionnaireOptional.isPresent()){
            questionnaireRepository.delete(questionnaireOptional.get());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        logger.error("Questionnaire not found!");
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
