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

function treasurerUI() 
{ 
  var html = HtmlService.createHtmlOutputFromFile('treasurer').setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('Treasury Report');
  SpreadsheetApp.getUi().showSidebar(html);
}

function getDues()
{
  var index;
  
  for (var i = 0; i < index; i++)
  {
    
  }
}

function treasurerData()
{
  var form = document.getElementById("treasurerForm");
  
  var code = form.elements[0].value;
  var size = form.elements[1].value;
  
  console.log(code + " " + size);
  
}
 
//Main function that needs to be called to run the program
function treasurerBot(LENGTH, CREW_SIZE, dues) 
{  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[4];
  var START = 3;
  
  //Handles each crew member individually
  for (var i = 0; i < CREW_SIZE; i++) 
  {
    //Handles temporary memory of spreadsheet data
    var values = "";
    
    //Handles whats put into the email
    var message = "";

    //Crew members name
    var name = sheet.getSheetValues(5 + (i * 2), 1, 1, 1);
    
    for (var j = START; j < LENGTH + START; j++) 
    {
      
      var wanted = false;
      
      for (var k = 0; k < LENGTH; k++)
      {
        if (sheet.getSheetValues(3, j, 1, 1) === dues[k])
        {
          wanted = true;
        }
      }
      
      //Only adds dues if they are wanted
      if (wanted)
      {
        values = sheet.getSheetValues(5 + (i * 2), j, 1, 1);
        
        if (values != "Exempt") 
        {
          if (values === "Paid") 
          {
            message = message + (sheet.getSheetValues(3, j, 1, 1)) + ": Paid\n\n";
          }
          else
          {
            message = message + (sheet.getSheetValues(3, j, 1, 1)) + ": Not paid\n\n"; 
          }
        }
      }
    }
    
    var email = emailFinder(name, i, CREW_SIZE);
    
    //Make this next line into a comment to check the messages before sent out
    sendEmail(email, name, message);
  }
  //Confirms on the sheet that you sent out the report
  Browser.msgBox("Treasury Report was sent out!");
}


//Takes everything in, and sends the email
function sendEmail(email, name, message) 
{
    MailApp.sendEmail(email, "Treasury Report of " + name, "Hello!\n\nThis is an automated message being sent out regarding your financial records in the crew.  This report is meant to help you keep track of what you have paid for in the crew.  If you feel like something is incorrect, please let me know.  It most likely means that we forgot to put it into the system.\n\n\nTreasurer Report for " + name + ":\n\n" + message + "\nPlease turn in any monthly dues that you have not turned in yet.  They allow us to fund the different activities we do, and help pay for our awards.\n\nIf you have any questions or concerns, please feel free to contact me.\n\tRyan Bilbee\n\tCrew 257\n\tCrew Treasurer");
}


