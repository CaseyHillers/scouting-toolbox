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

//Handles the core email indexing program, returning the emails for a person
function emailFinder(name, i) 
{
  rowLocator(name, i);
  var email = emailRetriever(name, i);
  
  return email;
}

//Finds what row the person is in on the Contact Information sheet
function rowLocator(name, i, CREW_SIZE) 
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
    
  var temp;
  temp = sheet.getSheetValues((i * 3) + 2, 1, 1, 1);
  
  //Does the long way incase it isn't found
  if (name != temp) 
  {
    var count;
    for (count = 0; count < CREW_SIZE; count++) 
    {
      if (name != temp) 
      {
        temp = sheet.getSheetValues((count * 3) + 2, 1, 1, 1);
      }
      else
      {
        i = count;
      }
    }
  }
  
}

//Retrieves all emails for a person
function emailRetriever(name, i) 
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  var emails = new Array("","","","");
  var x,y, number = 0;
  
  for (x = 0; x < 2; x++) 
  {
    for (y = 0; y < 2; y++) 
    {
      emails[number] = sheet.getSheetValues((i * 3) + 2 + y, (x * 4) + 3, 1, 1);
      number++;  
    }
  }
 
  var email = "";
  
  for (x = 0; x < 4; x++) 
  {
    if (emails[x] != "") 
    {
      if (x == 4) 
      {
       email += emails[x]; 
      } else 
      {
       email += emails[x] + ","; 
      }
    }
  }
  
  return email;
}
