// Casey Hillers' Venturing Management Tools: Tools to help Venture Crews manage themselves
// Copyright (C) 2015 Casey Hillers
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Advancement Report Script

var START = 6;
var COMPLETES = [[6,19],[21,29]];

//Shows the addMember side bar
function advancementReportForm()
{
  var html = HtmlService.createHtmlOutputFromFile('advancementReport').setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('Crew Advancement Report');
  SpreadsheetApp.getUi().showSidebar(html);
}

//Processes data from the addMember side bar to be used by the script
function processAdvancementReportForm(password, members, overall)
{
  
}

function advancementBot(CREW_SIZE) 
{
  CREW_SIZE = CrewSize();
  
  var message = "";
  var name = "";
  var email = "";
  
  for (var i = 0; i < CREW_SIZE; i++)
  {
    message = "";
    name = sheet.getSheetValues(START + (i * 2), 1, 1, 1);
    email = emailFinder(name, i, CREW_SIZE);
    
    message += venturingAward(i);
    
    message += "\n"
    
    message += discoveryAward(i);
    
    sendEmail("caseyhillers@gmail", name, message);
  }
}

function venturingAward(i)
{  
    var message = "";
  
    if (sheet.getSheetValues(START + (i * 2), COMPLETES[0], 1, 1) == "Partial")
    {
      var range = sheet.getRange("B3:E3")
      var requirements = range.getNotes()
      
      message += "Venturing Award\n";

      for (var j = 0; j < 4; j++)
      {
        if (sheet.getSheetValues(START + (i * 2), 2 + j , 1, 1) == "")
        {
          message += sheet.getSheetValues(3, 2 + j, 1, 1) + " : " + requirements[0][j] + "\nIncomplete\n";
      
        }
        else
        {
          message += "\t" + sheet.getSheetValues(3, 2 + j, 1, 1) + " : " + requirements[0][j] + "\n" + sheet.getSheetValues(START + (i * 2), 2 + j, 1, 1) + "\n";
        }
      }
    }
   return message;
}

function discoveryAward(i)
{
    var message = "";
  
    if (sheet.getSheetValues(START + (i * 2), COMPLETES[1], 1, 1) == "Partial")
    {
      var range = sheet.getRange("H3:R3")
      var requirements = range.getNotes()

      message += "Discovery Award\n";
      
      for (var j = 0; j < 11; j++)
      {
        if (sheet.getSheetValues(START + (i * 2), 8 + j , 1, 1) == "")
        {
          message += sheet.getSheetValues(3, 8 + j, 1, 1) + " : " + requirements[0][j] + "\nIncomplete\n";
        }
        else
        {
          message += "\t" + sheet.getSheetValues(3, 8 + j, 1, 1) + " : " + requirements[0][j] + "\n" + sheet.getSheetValues(START + (i * 2), 8 + j, 1, 1) + "\n"; 
        }
      }
      message += "\n\n\n";
    }
  return message;
}

//Takes everything in, and sends the email
function sendEmail(email, name, message) 
{
    MailApp.sendEmail("caseyhillers@gmail.com", "Advancement Report of " + name, "Hello!\n\nThis is an automated message being sent out regarding the requirements for the different awards that you have done.  This report is meant to help you keep track of your progress for the different awards, and show you how much you have done for each award.  If you feel like something is incorrect, please let me know.  It most likely means that we forgot to put it into the system.\n\n\nAdvancement Report for " + name + ":\n" + message + "\nAwards are meant to help develop you as a person.  They teach you valuable skills like planning and leading, and you can put the different awards you have gotten on college applications and resumes.\n\nIf you have any questions or concerns, please feel free to contact me.\n\tLuke Rodriguez\n\tCrew 257\n\tVice President of Administration");
}
