// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

  // Home 
import Home from "../pages/Home.jsx"

  // Login 
import Login from "../pages/auth/Login.jsx"
import SignUp from "../pages/auth/Signup.jsx"

  // Main TemplatePage
import TemplatePage from '../pages/TemplatePage.jsx';

  // ResumeTemplates
import Template1 from "../components/ai-resume-templates/Template1.jsx";
// import ResumeTemplate2 from "../components/ai-resume-templates/resumeTemplate2/ResumeTemplate2.jsx";
// import ResumeTemplate3 from "../components/ai-resume-templates/resumeTemplate3/ResumeTemplate3.jsx";
// import ResumeTemplate4 from "../components/ai-resume-templates/resumeTemplate4/ResumeTemplate4.jsx";
// import ResumeTemplate5 from "../components/ai-resume-templates/resumeTemplate5/ResumeTemplate5.jsx";
// import ResumeTemplate6 from "../components/ai-resume-templates/resumeTemplate6/ResumeTemplate6.jsx";
// import ResumeTemplate7 from "../components/ai-resume-templates/resumeTemplate7/ResumeTemplate7.jsx";
// import ResumeTemplate8 from "../components/ai-resume-templates/resumeTemplate8/ResumeTemplate8.jsx";
// import ResumeTemplate9 from "../components/ai-resume-templates/resumeTemplate9/ResumeTemplate9.jsx";
// import ResumeTemplate10 from "../components/ai-resume-templates/resumeTemplate10/ResumeTemplate10.jsx";
// import ResumeTemplate11 from "../components/ai-resume-templates/resumeTemplate11/ResumeTemplate11.jsx";
// import ResumeTemplate12 from "../components/ai-resume-templates/resumeTemplate12/ResumeTemplate12.jsx";
// import ResumeTemplate13 from "../components/ai-resume-templates/resumeTemplate13/ResumeTemplate13.jsx";
// import ResumeTemplate14 from "../components/ai-resume-templates/resumeTemplate14/ResumeTemplate14.jsx";
// import ResumeTemplate15 from "../components/ai-resume-templates/resumeTemplate15/ResumeTemplate15.jsx";
// import ResumeTemplate16 from "../components/ai-resume-templates/resumeTemplate16/ResumeTemplate16.jsx";
// import ResumeTemplate17 from "../components/ai-resume-templates/resumeTemplate17/ResumeTemplate17.jsx";
// import ResumeTemplate18 from "../components/ai-resume-templates/resumeTemplate18/ResumeTemplate18.jsx";
// import ResumeTemplate19 from "../components/ai-resume-templates/resumeTemplate19/ResumeTemplate19.jsx";
// import ResumeTemplate20 from "../components/ai-resume-templates/resumeTemplate20/ResumeTemplate20.jsx";
// import ResumeTemplate21 from "../components/ai-resume-templates/resumeTemplate21/ResumeTemplate21.jsx";
// import ResumeTemplate22 from "../components/ai-resume-templates/resumeTemplate22/ResumeTemplate22.jsx";
// import ResumeTemplate23 from "../components/ai-resume-templates/resumeTemplate23/ResumeTemplate23.jsx";
// import ResumeTemplate24 from "../components/ai-resume-templates/resumeTemplate24/ResumeTemplate24.jsx";
// import ResumeTemplate25 from "../components/ai-resume-templates/resumeTemplate25/ResumeTemplate25.jsx";
// import ResumeTemplate26 from "../components/ai-resume-templates/resumeTemplate26/ResumeTemplate26.jsx";
// import ResumeTemplate27 from "../components/ai-resume-templates/resumeTemplate27/ResumeTemplate27.jsx";
// import ResumeTemplate28 from "../components/ai-resume-templates/resumeTemplate28/ResumeTemplate28.jsx";
// import ResumeTemplate29 from "../components/ai-resume-templates/resumeTemplate29/ResumeTemplate29.jsx";
// import ResumeTemplate30 from "../components/ai-resume-templates/resumeTemplate30/ResumeTemplate30.jsx";
// import ResumeTemplate31 from "../components/ai-resume-templates/resumeTemplate31/ResumeTemplate31.jsx";
// import ResumeTemplate32 from "../components/ai-resume-templates/resumeTemplate32/ResumeTemplate32.jsx";
// import ResumeTemplate33 from "../components/ai-resume-templates/resumeTemplate33/ResumeTemplate33.jsx";
// import ResumeTemplate34 from "../components/ai-resume-templates/resumeTemplate34/ResumeTemplate34.jsx";
// import ResumeTemplate35 from "../components/ai-resume-templates/resumeTemplate35/ResumeTemplate35.jsx";
// import ResumeTemplate36 from "../components/ai-resume-templates/resumeTemplate36/ResumeTemplate36.jsx";
// import ResumeTemplate37 from "../components/ai-resume-templates/resumeTemplate37/ResumeTemplate37.jsx";
// import ResumeTemplate38 from "../components/ai-resume-templates/resumeTemplate38/ResumeTemplate38.jsx";
// import ResumeTemplate39 from "../components/ai-resume-templates/resumeTemplate39/ResumeTemplate39.jsx";

import Trytemp from '../components/Trytemp.jsx';


// Not Found
import NotFound from "../pages/NotFound.jsx";

const AppRoutes = () => {
  return (
    <Routes>
  {/* Public Routes */}
  <Route path='/' element={<Home />} />
  <Route path='/templatepage' element={<TemplatePage />} />

          <Route  path='/' element={<Home />} />
          <Route  path='/template1' element={<Template1 />} />
          {/* <Route  path='/resume-template1' element={<Template1/>} />
          <Route  path='/resume-template2' element={<ResumeTemplate2/>} />
          <Route  path='/resume-template3' element={<ResumeTemplate3/>} />
          <Route  path='/resume-template4' element={<ResumeTemplate4/>} />
          <Route  path='/resume-template5' element={<ResumeTemplate5/>} />
          <Route  path='/resume-template6' element={<ResumeTemplate6/>} />
          <Route  path='/resume-template7' element={<ResumeTemplate7/>} />
          <Route  path='/resume-template8' element={<ResumeTemplate8/>} />
          <Route  path='/resume-template9' element={<ResumeTemplate9/>} />
          <Route  path='/resume-template10' element={<ResumeTemplate10/>} />
          <Route  path='/resume-template11' element={<ResumeTemplate11/>} />
          <Route  path='/resume-template12' element={<ResumeTemplate12/>} />
          <Route  path='/resume-template13' element={<ResumeTemplate13/>} />
          <Route  path='/resume-template14' element={<ResumeTemplate14/>} />
          <Route  path='/resume-template15' element={<ResumeTemplate15/>} />
          <Route  path='/resume-template16' element={<ResumeTemplate16/>} />
          <Route  path='/resume-template17' element={<ResumeTemplate17/>} />
          <Route  path='/resume-template18' element={<ResumeTemplate18/>} />
          <Route  path='/resume-template19' element={<ResumeTemplate19/>} />
          <Route  path='/resume-template20' element={<ResumeTemplate20/>} />
          <Route  path='/resume-template21' element={<ResumeTemplate21/>} />
          <Route  path='/resume-template22' element={<ResumeTemplate22/>} />
          <Route  path='/resume-template23' element={<ResumeTemplate23/>} />
          <Route  path='/resume-template24' element={<ResumeTemplate24/>} />
          <Route  path='/resume-template25' element={<ResumeTemplate25/>} />
          <Route  path='/resume-template26' element={<ResumeTemplate26/>} />
          <Route  path='/resume-template27' element={<ResumeTemplate27/>} />
          <Route  path='/resume-template28' element={<ResumeTemplate28/>} />
          <Route  path='/resume-template29' element={<ResumeTemplate29/>} />
          <Route  path='/resume-template30' element={<ResumeTemplate30/>} />
          <Route  path='/resume-template31' element={<ResumeTemplate31/>} />
          <Route  path='/resume-template32' element={<ResumeTemplate32/>} />
          <Route  path='/resume-template33' element={<ResumeTemplate33/>} />
          <Route  path='/resume-template34' element={<ResumeTemplate34/>} />
          <Route  path='/resume-template35' element={<ResumeTemplate35/>} />
          <Route  path='/resume-template36' element={<ResumeTemplate36/>} />
          <Route  path='/resume-template37' element={<ResumeTemplate37/>} />
          <Route  path='/resume-template38' element={<ResumeTemplate38/>} />
          <Route  path='/resume-template39' element={<ResumeTemplate39/>} /> */}

        
          
          {/* Login and Signup */}
          <Route exact path='/Login' element={<Login/>} />
          <Route exact path='/SignUp' element={<SignUp/>} />
         

          {/*  404 Not Found Route  */}
  <Route path='*' element={<NotFound />} />
</Routes>
  );
};
export default AppRoutes;      