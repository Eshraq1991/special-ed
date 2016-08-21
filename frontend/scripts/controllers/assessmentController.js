angular.module('SED.multiForms', ['ngAnimate', 'ui.bootstrap'])
// controller for creating multi form in one view one after one
.controller('assessmentController', function assessmentController ($scope, $location, $log, $uibModal, Record, Students) {
  $scope.counter = 0;
  $scope.list = {};
  var Qnum;
  var finalScore = { "Social": 0, "Preservation": 0, "SensoryDisturbance": 0, "CommunicationandDevelopment": 0, "AttentionandSafety": 0 };
  var socialQuestionsCategories = [{ Q:"withdrawn, aloof, avoids contact with others, or prefers to play alone rather than with peers", questionNum: 1, category: "Social", value: null}, { Q:"parallel play along side but not with peers", questionNum: 2, category: "Social", value: null}, { Q:"difficulty establishing friendships", questionNum: 3, category: "Social", value: null}, { Q:"limited social smile or eye contact (looks away, looks through people, looks at speaker’s mouth, needs to be prompted to make eye contact, or does not make eye contact when communicating)", questionNum: 4, category: "Social", value: null}, { Q:"limited sharing and showing (e.g., does not show a toy to an adult, seek recognition, or share an experience or accomplishment with others)", questionNum: 5, category: "Social", value: null}, { Q:"excessively rigid play with peers (dictates play according to his/her peculiar and repetitive interests and rules)", questionNum: 6, category: "Social", value: null}, { Q:"enjoys physical or sensory play with others (e.g., tickling, chasing) but has limited reciprocal social interaction (e.g., does not play social games or games involving turn taking)", questionNum: 7, category: "Social", value: null}, { Q:"self-absorbed or in own world (e.g., engages in self-stimulating behaviors, talks to self, or fantasizes excessively about things such as movies or cartoons)", questionNum: 8, category: "Social", value: null}, { Q:"oblivious to the presence of others or unresponsive to the social overtures of others", questionNum: 9, category: "Social", value: null}, { Q:"inappropriately talks to or hugs strangers", questionNum: 10, category: "Social", value: null}, { Q:"invades personal space (gets too close to or touches others)", questionNum: 11, category: "Social", value: null}, { Q:"no stranger/separation anxiety when young (not wary of strangers or upset if separated from parents)", questionNum: 12, category: "Social", value: null}, { Q:"socially inappropriate, insensitive comments or behaviors (picks nose in public, asks personal uestions)", questionNum: 13, category: "Social", value: null}, { Q:"does not appropriately initiate or sustain peer interaction though may interact well with adults", questionNum: 14, category: "Social", value: null}, { Q:"poor social reasoning (difficulty understanding social cues/comments, facial expressions, body language)", questionNum: 15, category: "Social", value: null}, { Q:"wants to have friends but does not know how to make friends", questionNum: 16, category: "Social", value: null}];
  var preservationCategories = [{ Q: "obsessive preoccupations or extreme fixation on things such as certain movies or TV shows (reenacts or watches the same movies over and over), computer games, letters, shapes, numbers, counting, objects or topics (e.g., trains, dinosaurs, NASCAR, maps, planes, electricity, Yu-Gi-Oh, cartoon characters, etc.)", questionNum: 17, category: "Preservation", value: null }, { Q: "unusual attachment to and holding or hoarding objects (e.g., small figures, string)", questionNum: 18, category: "Preservation", value: null }, { Q: "repetitive play (e.g., excessively lines up, sorts, spins, or throws objects; opens and closes things repeatedly; plays with the same toys without variation; draws the same pictures repeatedly)", questionNum: 19, category: "Preservation", value: null }, { Q: "disinterest in toys or lack of normal and varied imaginative play", questionNum: 20, category: "Preservation", value: null }, { Q: "unusual preoccupation with parts of objects (e.g., repetitively spins wheels on a toy)", questionNum: 21, category: "Preservation", value: null }, { Q: "distressed by change (e.g., change in routine or schedule, parent takes a different car route home from school, furniture or child’s toys are moved, seasonal change in clothing)", questionNum: 22, category: "Preservation", value: null }, { Q: "difficulty with transitions (e.g., from one activity to another)", questionNum: 23, category: "Preservation", value: null }, { Q: "extreme need to finish what he/she starts", questionNum: 24, category: "Preservation", value: null }, { Q: "idiosyncratic or ritualized patterns (e.g., drinks only from a certain cup, wears only certain clothes, insists that food be arranged a certain way on a plate)", questionNum: 25, category: "Preservation", value: null }, { Q: "insists that things be in a certain location or a certain way (e.g., doors must be closed, coats zipped, etc.)", questionNum: 26, category: "Preservation", value: null }, { Q: "insists on doing things the same way every time", questionNum: 27, category: "Preservation", value: null }, { Q: "overly precise and inflexible, upset if someone breaks a “rule,” rigid and literal thinking", questionNum: 28, category: "Preservation", value: null }, { Q: "Stereotypies (unusual repetitive movements such as hand flapping when excited, toe walking, body rocking, head shaking, body tensing, teeth clenching, teeth grinding while awake, finger movements, facial grimacing, repeatedly running back and forth, twirling or spinning, pacing, playing with saliva, skin picking)", questionNum: 29, category: "Preservation", value: null }];
  var somatoSensoryDisturbanceCategories = [{ Q: " Excessive atypical craving and love of spinning, tickling, climbing, rocking, swinging, bouncing, jumping", questionNum: 30, category: "Sensory Disturbance", value: null }, { Q: " Unresponsive at times to verbal input (not react when name called or spoken to, hearing DISTURBANCEriuestioned)", questionNum: 31, category: "Sensory Disturbance", value: null }, { Q: "unusual hypersensitivity to some sounds (e.g., distress or covering ears in response to loud noise, motors, vacuum cleaner, hair dryer, baby crying, sirens, clapping, alarms, toilet flushing, people singing)", questionNum: 32, category: "Sensory Disturbance", value: null }, { Q: "unusual hypersensitivity to smell, light, or temperature", questionNum: 33, category: "Sensory Disturbance", value: null }, { Q: "Distress with commotion or crowds (uncomfortable/anxious in large groups, theatres, cafeterias, parties)", questionNum: 34, category: "Sensory Disturbance", value: null }, { Q: " Extreme fascination with spinning or repetitive movements (e.g., revolving fans, Wheel of Fortune, running water), linear patterns (e.g., credits on TV, window blinds), minute details, lights, shiny surfaces ", questionNum: 35, category: "Sensory Disturbance", value: null }, { Q: "excessively smells, mouths, chews, licks, or rubs inanimate objects or surfaces", questionNum: 36, category: "Sensory Disturbance", value: null }, { Q: "repetitively visually scrutinizes objects or finger movements close to eyes", questionNum: 37, category: "Sensory Disturbance", value: null }, { Q: "places ears against things that vibrate or hum or presses objects against facean unusual degree", questionNum: 38, category: "Sensory Disturbance", value: null }, { Q: "Tactile defensiveness or extreme dislike of: being touched or hugged", questionNum: 39, category: "Sensory Disturbance", value: null }, { Q: "Tactile defensiveness or extreme dislike of: touching certain things or getting hands dirty or sticky", questionNum: 40, category: "Sensory Disturbance", value: null }, { Q: "Tactile defensiveness or extreme dislike of: water on self or clothes", questionNum: 41, category: "Sensory Disturbance", value: null }, { Q: "Tactile defensiveness or extreme dislike of: having face washed, teeth brushed, hair combed, or nails cut", questionNum: 42, category: "Sensory Disturbance", value: null }, { Q: "Tactile defensiveness or extreme dislike of: walking in bare feet", questionNum: 43, category: "Sensory Disturbance", value: null }, { Q: "Tactile defensiveness or extreme dislike of: clothing that is tight, seams in clothes, or certain textures of clothing", questionNum: 44, category: "Sensory Disturbance", value: null }, { Q: "High tolerance for pain (e.g., does not cry when hurt or does not respondmally to painful stimuli)", questionNum: 45, category: "Sensory Disturbance", value: null }, { Q: "Sleep disturbance (e.g., difficulty falling asleep, waking during the night, waking early in the morning)", questionNum: 46, category: "Sensory Disturbance", value: null }, { Q: "very picky eater, limited food preferences, insists on eating only a few foods", questionNum: 47, category: "Sensory Disturbance", value: null }, { Q: "hypersensitivity to textures (e.g., lumps in food)", questionNum: 48, category: "Sensory Disturbance", value: null }, { Q: "retains food in mouth without swallowing", questionNum: 49, category: "Sensory Disturbance", value: null }, { Q: "eats inedible substances", questionNum: 50, category: "Sensory Disturbance", value: null }, { Q: "other peculiar eating patterns (e.g., eats only one brand, color, or shape of a food)", questionNum: 51, category: "Sensory Disturbance", value: null }];
  var communicationAndDevelopmentCategories = [{ Q: "Language regression or slowing at approximately 1 to 2 years of age (e.g., speaking a few words at one year but then losing speech or normal early language development and later language is delayed)", questionNum: 52, category: "Communication and Development", value: null }, { Q: "Visual-motor skills (e.g., assembling puzzles, building with Legos, operating the VCR) significantly higher than language skills during the preschool years or walking at a much earlier age than talking", questionNum: 53, category: "Communication and Development", value: null }, { Q: "absent or limited communicative speech but gestures to communicate (e.g., pulls an adult by the hand and leads to what wants, hands an object to an adult for assistance, brings a cup to an adult for a drink)", questionNum: 54, category: "Communication and Development", value: null }, { Q: "communicates verbally with others only when stressed or needing something", questionNum: 55, category: "Communication and Development", value: null }, { Q: "difficulty with reciprocal conversational speech (initiating and sustaining conversations, listening and responding to what others say), talks at people, or one-sided conversations on topics of interest to self", questionNum: 56, category: "Communication and Development", value: null }, { Q: "unusual voice quality or modulation (e.g., high pitch, sing song voice, lack of intonation, etc.)", questionNum: 57, category: "Communication and Development", value: null }, { Q: "screeches or makes other odd noises (e.g., growls, hums, etc.)", questionNum: 58, category: "Communication and Development", value: null }, { Q: "unusual repetitive vocalizations and sounds", questionNum: 59, category: "Communication and Development", value: null }, { Q: "idiosyncratic jargon as if talking in own language", questionNum: 60, category: "Communication and Development", value: null }, { Q: "echolalia (inappropriately mimics what others say, such as repeating instead of answering a COMMUNICATIONuestion)", questionNum: 61, category: "Communication and Development", value: null }, { Q: "sporadic speech (says a word or phrase once and rarely or never says it again)", questionNum: 62, category: "Communication and Development", value: null }, { Q: "excessively recites from movies, cartoons, commercials, etc.", questionNum: 63, category: "Communication and Development", value: null }, { Q: "uses rote or memorized phrases that are excessive, out of context, or not relevant ", questionNum: 64, category: "Communication and Development", value: null }, { Q: "makes pronoun substitutions (e.g., says “you” when meaning “I”)", questionNum: 65, category: "Communication and Development", value: null }, { Q: "excessively repetitive speech and COMMUNICATIONuestions", questionNum: 66, category: "Communication and Development", value: null }, { Q: "idiosyncratic thoughts and speech (makes up words, nonsensical speech, uniCOMMUNICATIONue views and perceptions)", questionNum: 67, category: "Communication and Development", value: null }, { Q: "exceptional rote memory (e.g., at an unusually young age, identifies numbers, letters, shapes, logos, and colors; sings or hums tunes; memorizes car routes; counts; recites the alphabet; reads; spells; etc.)", questionNum: 68, category: "Communication and Development", value: null }, { Q: "phenomenal vocabulary or ability to memorize movies, books, or factual information", questionNum: 69, category: "Communication and Development", value: null }, { Q: "remarkable ability to mimic movie or cartoon characters", questionNum: 70, category: "Communication and Development", value: null }, { Q: "outstanding visual-mechanical skills (e.g., at an unusually young age, assembles puzzles, matches shapes, operates a computer or VCR, figures out how things work, complex constructions with Legos)", questionNum: 71, category: "Communication and Development", value: null }, { Q: "remarkable artistic or musical talent", questionNum: 72, category: "Communication and Development", value: null }, { Q: "extremely well-developed gross motor skills with delayed development in other areas (in contrast to highfunctioning children with autism who often have writing or coordination problems)", questionNum: 73, category: "Communication and Development", value: null }, { Q: "Overreactivity, irritability, low frustration tolerance, agitation, tantrums, meltdowns, explosiveness, aggression, or self-injurious behavior (distressed by minor events or occurrences most children can tolerate, such as intrusions, activity interruptions, proximity, confinement, performance demands, writing tasks, or when things are not the way the child thinks they should be)", questionNum: 74, category: "Communication and Development", value: null }];
  var attentionAndSafetyCategories = [{ Q: "Selective attention, ability to hyperfocus on activities, objects, or topics of interest to self (e.g., lines up toys, spins wheels, watches the same movie, assembles puzzles, builds with Legos, or draws pictures for long periods of time), but is inattentive, impulsive, and fidgety at other times", questionNum: 75, category: "Attention and Safety", value: null }, { Q: "Limited safety awareness, fearless, or oblivious to danger (e.g., unsafe climbing, wanders about house at night, runs off by self, goes into traffic or water, walks off with strangers)", questionNum: 76, category: "Attention and Safety", value: null }];
  var savedAssessmentQs = {};
  
  $scope.totalNumberOfQuestions = 76;
  $scope.showAllQs = false;
  $scope.animationsEnabled = true;
  
  $scope.open = function (size) {
    var modalInstance = $uibModal.open( {
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: function ($scope, $location, $uibModalInstance, Record) {
        $scope.ok = function () {
          $uibModalInstance.close (finalScore);
        };
        $scope.cancel = function () {
          $uibModalInstance.dismiss ('cancel');
        };
      },
      size: size,
      resolve: {
        finalScore: function () {
          return finalScore;
        }
      }
    });
    modalInstance.result.then(function (finalScore) {
      Record.submitForm(finalScore)
      .then(function(data) {
        $location.path('#/dashboard/profile')
      })
      .catch (function (error) {
      } );
    }, function () {
      $log.info ('Modal dismissed at: ' + new Date ());
    });
  };
  $scope.saveAs = function (questions) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalSaveAs.html',
      controller: function($scope, $uibModalInstance, $location) {
        $scope.savedAssessment = {};
        $scope.ok = function () {
          console.log($scope.savedAssessment.name, 2)
          $scope.savedAssessment.questions = savedAssessmentQs;
          $uibModalInstance.close($scope.savedAssessment);
        };
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      },
      resolve: {
        savedAssessment: function () {
          console.log($scope.savedAssessment, 1)
          return $scope.savedAssessment;
        }
      }
    });
    modalInstance.result.then(function (savedAssessment) {
      console.log(savedAssessment, 3)
      $location.path('/dashboard/overview')
      // Record.submitForm(finalScore)
      // .then(function(data) {
      //   console.log(data);
      // })
      // .catch(function(error) {
      //   console.error(error);
      // });
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.start = function () {
    $scope.readyToStart = false;
    $scope.currentQuestion = $scope.list.questions[Qnum];
  };
  $scope.showAll = function () {
    $scope.showAllQs = !$scope.showAllQs;
  };
  $scope.nextQuestion = function () {
    if ($scope.currentQuestion.value) {
      finalScore[$scope.currentQuestion.category] += JSON.parse ($scope.currentQuestion.value);
    }
    Qnum++;
    if (Qnum < 76) {
      $scope.currentQuestion = $scope.list.questions[Qnum];
    } else if (Qnum === 76) {
      $scope.readyToSubmit = true;
    }
  };
  $scope.saveAndContinue = function () {
    for (var i = 0; i < $scope.list.questions.length; i++) {
      savedAssessmentQs[$scope.list.questions[i].questionNum.toString()] = JSON.parse($scope.list.questions[i].value);
    }
    $scope.saveAs(savedAssessmentQs);
  };
  $scope.goToQuestion = function (no) {
    Qnum = no;
    $scope.showAllQs = !$scope.showAllQs;
    $scope.currentQuestion = $scope.list.questions[no];
  };
  $scope.initialize = function () {
    $scope.readyToSubmit = false;
    $scope.readyToStart = true;
    $scope.list.questions = socialQuestionsCategories.concat(preservationCategories, somatoSensoryDisturbanceCategories, communicationAndDevelopmentCategories, attentionAndSafetyCategories);
    Qnum = 0;
  };
  $scope.result = [];
  $scope.initialize ();
});
