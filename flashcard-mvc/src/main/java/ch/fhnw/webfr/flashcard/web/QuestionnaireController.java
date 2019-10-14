package ch.fhnw.webfr.flashcard.web;

import java.util.Optional;

import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;

@Controller
@RequestMapping("/questionnaires")
public class QuestionnaireController {
	private static final Log logger = LogFactory.getLog(QuestionnaireController.class);

	@Autowired
	private QuestionnaireRepository questionnaireRepository;

	@GetMapping
	public String findAll(Model model) {
		model.addAttribute("questionnaires", questionnaireRepository.findAll());
		return "questionnaires/list";
	}

	@GetMapping(value = "/{id}")
	public String findById(@PathVariable String id, Model model) {
		model.addAttribute("questionnaire", questionnaireRepository.findById(id).get());
		return "questionnaires/show";
	}

	@GetMapping(params = "form")
	public String createForm(Model model) {
		model.addAttribute("questionnaire", new Questionnaire());
		return "questionnaires/create";
	}

	@PostMapping
	public String create(@Valid Questionnaire questionnaire, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			logger.debug("Binding error: " + bindingResult.getAllErrors());
			return "questionnaires/create";
		}
		questionnaireRepository.save(questionnaire);
		return "redirect:/questionnaires";
	}

	@DeleteMapping(value = "/{id}")
	public String delete(@PathVariable String id) {
		questionnaireRepository.deleteById(id);
		return "redirect:/questionnaires";
	}

	@GetMapping(value = "/{id}", params = "form")
	public String updateForm(@PathVariable String id, Model uiModel) {
		Optional<Questionnaire> questionnaireOptional = questionnaireRepository.findById(id);
		if (questionnaireOptional.isPresent()) {
			Questionnaire questionnaire = questionnaireOptional.get();
			uiModel.addAttribute("questionnaire", questionnaire);
			return "questionnaires/update";
		} else {
			logger.info("No entity found with id=" + id);
			return "404";
		}
	}

	@PutMapping(value = "/{id}")
	public String update(@PathVariable String id, @Valid Questionnaire questionnaire, BindingResult bindingResult,
			Model uiModel) {
		if (bindingResult.hasErrors()) {
			logger.debug("Binding error: " + bindingResult.getAllErrors());
			return "questionnaires/update";
		}
		Optional<Questionnaire> questionnaireOptional = questionnaireRepository.findById(id);
		if (questionnaireOptional.isPresent()) {
			Questionnaire oldQuestionnsaire = questionnaireOptional.get();
			oldQuestionnsaire.setDescription(questionnaire.getDescription());
			oldQuestionnsaire.setTitle(questionnaire.getTitle());
			questionnaireRepository.save(oldQuestionnsaire);
		}
		return "redirect:/questionnaires";
	}

	// Force an exception: Just for testing!
	@GetMapping(params = "exception")
	public void exception() throws DataAccessException {
		throw new DataIntegrityViolationException("Just Testing");
	}
}
