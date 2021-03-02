document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
  document.getElementById("selTitleSearch").addEventListener("click", function(event){
    document.getElementById("updateDevSearch").style.display = "none";
    document.getElementById("updatePlatSearch").style.display = "none";
    document.getElementById("updateFranchiseSearch").style.display = "none";

    document.getElementById("updateTitleSearch").style.display = "block";

    document.getElementById("updateSuccessful").style.display = "none"
  });

  document.getElementById("selDevSearch").addEventListener("click", function(event){
    document.getElementById("updateTitleSearch").style.display = "none";
    document.getElementById("updatePlatSearch").style.display = "none";
    document.getElementById("updateFranchiseSearch").style.display = "none";

    document.getElementById("updateDevSearch").style.display = "block";

    document.getElementById("updateSuccessful").style.display = "none"
  });

  document.getElementById("selPlatSearch").addEventListener("click", function(event){
    document.getElementById("updateTitleSearch").style.display = "none";
    document.getElementById("updateDevSearch").style.display = "none";
    document.getElementById("updateFranchiseSearch").style.display = "none";

    document.getElementById("updatePlatSearch").style.display = "block";

    document.getElementById("updateSuccessful").style.display = "none"
  });

  document.getElementById("selFranchiseSearch").addEventListener("click", function(event){
    document.getElementById("updateTitleSearch").style.display = "none";
    document.getElementById("updateDevSearch").style.display = "none";
    document.getElementById("updatePlatSearch").style.display = "none";

    document.getElementById("updateFranchiseSearch").style.display = "block";

    document.getElementById("updateSuccessful").style.display = "none"
  });

  document.getElementById("searchTitleButton").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();

    var payload = {"action": "searchTitle",
                    "titleName": document.getElementById('searchTitleName').value,
                    "titlePlatID": document.getElementById('searchTitlePlatID').value, 
                    "titleFromDate": document.getElementById('searchTitleFromDate').value, 
                    "titleToDate": document.getElementById('searchTitleToDate').value, 
                    "titleGenre": document.getElementById('searchTitleGenre').value, 
                    "titleFranchiseID": document.getElementById('searchTitleFranchiseID').value,
                    "titleDevID": document.getElementById('searchTitleDevID').value,
                    "titleESRB": document.getElementById('searchTitleESRB').value};

    req.open('POST', '/update', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        res = JSON.parse(req.responseText);

        // clear out current search result table rows
        var prevTableRows = document.getElementsByClassName('searchResultRow');
        while (prevTableRows[0]) {
          prevTableRows[0].remove();
        }
        searchTable = document.getElementById("searchResultTable")
        
        // add appropriate header rows for Titles table
        header_tr = document.createElement('tr');
        header_tr.setAttribute('class', 'searchResultRow');

        header_elements = ["Title", "Platforms", "Release Date<br/>(North America)", "Genre",
                            "Franchise", "Developer", "ESRB Rating", "Update/Edit?"];
        for (var i = 0; i < header_elements.length; i++) {
          header_td = document.createElement('th');
          if (i != 2) {
            header_td.textContent = header_elements[i];
          } else {
            header_td.innerHTML = header_elements[i];
          }
          header_tr.appendChild(header_td);
        }
        searchTable.appendChild(header_tr);

        // add each row into the search result table
        for (var i = 0; i < res.length; i++) {
          title_tr = document.createElement('tr');
          title_tr.setAttribute('class', 'searchResultRow');

          // title name cells
          td_cell = document.createElement('td');
          td_cell.textContent = res[i][1];
          title_tr.appendChild(td_cell);

          // platforms cells
          td_cell = document.createElement('td');
          plat_list = document.createElement('ul');
          plat_list.setAttribute('class', 'platformList');
          for (var j = 0; j < res[i][7].length; j++) {
            plat_item = document.createElement('li');
            plat_item.textContent = res[i][7][j];
            plat_list.appendChild(plat_item);
          }
          td_cell.appendChild(plat_list);
          title_tr.appendChild(td_cell);

          // genre, franchise, dev, esrb cells
          for (var j = 2; j < 7; j++) {
            td_cell = document.createElement('td');
            td_cell.textContent = res[i][j]
            title_tr.appendChild(td_cell);
          }

          // update button
          button_td = document.createElement('td');
          update_button = document.createElement('button');
          update_button.setAttribute('type', 'button');
          update_button.setAttribute('class', 'updateTitleButton');
          update_button.textContent = "Update/Edit";
          button_td.appendChild(update_button);

          // save button, has a value of the ID of the title
          save_button = document.createElement('button');
          save_button.setAttribute('type', 'button');
          save_button.setAttribute('class', 'saveTitleButton');
          save_button.setAttribute('value', res[i][0]);
          save_button.textContent = "Save Changes";
          button_td.appendChild(save_button);
          
          title_tr.appendChild(button_td);

          searchTable.appendChild(title_tr);
        }

        // rebind the new update buttons to trigger update query
        bind_updateTitle_buttons();

      } else {
        console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));
  });

  document.getElementById("searchDevButton").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();

    var payload = {"action": "searchDev",
                    "devName": document.getElementById('searchDevName').value,
                    "devCountry": document.getElementById('searchDevCountry').value, 
                    "devFromDate": document.getElementById('searchDevFromDate').value, 
                    "devToDate": document.getElementById('searchDevToDate').value};

    req.open('POST', '/update', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        res = JSON.parse(req.responseText);

        // clear out current search result table rows
        var prevTableRows = document.getElementsByClassName('searchResultRow');
        while (prevTableRows[0]) {
          prevTableRows[0].remove();
        }
        searchTable = document.getElementById("searchResultTable")
        
        // add appropriate header rows for Developer Studios table
        header_tr = document.createElement('tr');
        header_tr.setAttribute('class', 'searchResultRow');
        header_elements = ["Developer Studio", "Country", "Date Founded", "Update/Edit?"];
        for (var i = 0; i < header_elements.length; i++) {
          header_th = document.createElement('th');
          header_th.textContent = header_elements[i];
          header_tr.appendChild(header_th);
        }
        searchTable.appendChild(header_tr);

        // add each row into the search result table
        for (var i = 0; i < res.length; i++) {
          title_tr = document.createElement('tr');
          title_tr.setAttribute('class', 'searchResultRow');
          
          // name, country, date founded cells
          for (var j = 1; j < 4; j++) {
            td_cell = document.createElement('td');
            td_cell.textContent = res[i][j];
            title_tr.appendChild(td_cell);
          }

          // update button
          button_td = document.createElement('td');
          update_button = document.createElement('button');
          update_button.setAttribute('type', 'button');
          update_button.setAttribute('class', 'updateDevButton');
          update_button.textContent = "Update/Edit";
          button_td.appendChild(update_button);
          title_tr.appendChild(button_td);

          // save button, has a value of the ID of the dev
          save_button = document.createElement('button');
          save_button.setAttribute('type', 'button');
          save_button.setAttribute('class', 'saveDevButton');
          save_button.setAttribute('value', res[i][0]);
          save_button.textContent = "Save Changes";
          button_td.appendChild(save_button);

          searchTable.appendChild(title_tr);
        }

        // rebind the new update buttons to trigger update query
        bind_updateDev_buttons();

      } else {
        console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));
  });

  document.getElementById("searchPlatButton").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();

    var platInProd = Array.from(document.getElementsByClassName("searchPlatInProd"));
    if (platInProd[0].checked) {
      platInProd = "Yes";
    } else if (platInProd[1].checked) {
      platInProd = "No";
    } else {
      platInProd = "";
    }

    var payload = {"action": "searchPlat",
            "platName": document.getElementById('searchPlatName').value,
            "platFromDate": document.getElementById('searchPlatFromDate').value, 
            "platToDate": document.getElementById('searchPlatToDate').value, 
            "platDev": document.getElementById('searchPlatDev').value,
            "platInProd": platInProd};

    req.open('POST', '/update', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        res = JSON.parse(req.responseText);

        // clear out current search result table rows
        var prevTableRows = document.getElementsByClassName('searchResultRow');
        while (prevTableRows[0]) {
          prevTableRows[0].remove();
        }

        searchTable = document.getElementById("searchResultTable")
        
        // add appropriate header rows for Platforms table
        header_tr = document.createElement('tr');
        header_tr.setAttribute('class', 'searchResultRow');
        
        header_elements = ["Platform", "Release Date<br/>(North America)", "Developer", "In Prduction", "Update/Edit?"];
        for (var i = 0; i < header_elements.length; i++) {
          header_th = document.createElement('th');
          if (i != 1) {
            header_th.textContent = header_elements[i];
          } else {
            header_th.innerHTML = header_elements[i];
          }
          header_tr.appendChild(header_th);
        }
        searchTable.appendChild(header_tr);

        // add each row into the search result table
        for (var i = 0; i < res.length; i++) {
          title_tr = document.createElement('tr');
          title_tr.setAttribute('class', 'searchResultRow');
          
          // name, release, dev cells
          for (var j = 1; j < 4; j++) {
            td_cell = document.createElement('td');
            td_cell.textContent = res[i][j];
            title_tr.appendChild(td_cell);
          }

          // in production cell
          td_cell = document.createElement('td');
          if (res[i][4]) {
            td_cell.textContent = "Y"
          } else {
            td_cell.textContent = "N"
          }
          title_tr.appendChild(td_cell);

          // add update button
          button_td = document.createElement('td');
          update_button = document.createElement('button');
          update_button.setAttribute('type', 'button');
          update_button.setAttribute('class', 'updatePlatButton');
          update_button.textContent = "Update/Edit";
          button_td.appendChild(update_button);
          title_tr.appendChild(button_td);

          // save button, has a value of the ID of the dev
          save_button = document.createElement('button');
          save_button.setAttribute('type', 'button');
          save_button.setAttribute('class', 'savePlatButton');
          save_button.setAttribute('value', res[i][0]);
          save_button.textContent = "Save Changes";
          button_td.appendChild(save_button);

          searchTable.appendChild(title_tr);
        }

        // rebind the new update buttons to trigger update query
        bind_updatePlat_buttons();

      } else {
        console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));
  });

  document.getElementById("searchFranchiseButton").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();

    var payload = {"action": "searchFranchise",
            "franchiseName": document.getElementById('searchFranchiseName').value,
            "franchiseDev": document.getElementById('searchFranchiseDev').value};

    req.open('POST', '/update', true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400) {
        res = JSON.parse(req.responseText);

        // clear out current search result table rows
        var prevTableRows = document.getElementsByClassName('searchResultRow');
        while (prevTableRows[0]) {
          prevTableRows[0].remove();
        }

        searchTable = document.getElementById("searchResultTable")
        
        // add appropriate header rows for Franchises table
        header_tr = document.createElement('tr');
        header_tr.setAttribute('class', 'searchResultRow');
        header_elements = ["Franchise", "Developer", "Update/Edit?"];
        for (var i = 0; i < header_elements.length; i++) {
          header_td = document.createElement('th');
        header_td.textContent = header_elements[i]
        header_tr.appendChild(header_td);
        }
        searchTable.appendChild(header_tr);

        // add each row into the search result table
        for (var i = 0; i < res.length; i++) {
          title_tr = document.createElement('tr');
          title_tr.setAttribute('class', 'searchResultRow');
          
          // name, developer cells
          for (var j = 1; j < 3; j++) {
            td_cell = document.createElement('td');
            td_cell.textContent = res[i][j];
            title_tr.appendChild(td_cell);
          }

          // add update button
          button_td = document.createElement('td');
          update_button = document.createElement('button');
          update_button.setAttribute('type', 'button');
          update_button.setAttribute('class', 'updateFranchiseButton');
          update_button.textContent = "Update/Edit"
          button_td.appendChild(update_button);
          title_tr.appendChild(button_td);

          // save button, has a value of the ID of the dev
          save_button = document.createElement('button');
          save_button.setAttribute('type', 'button');
          save_button.setAttribute('class', 'saveFranchiseButton');
          save_button.setAttribute('value', res[i][0]);
          save_button.textContent = "Save Changes";
          button_td.appendChild(save_button);

          searchTable.appendChild(title_tr);
        }

        // rebind the new update buttons to trigger update query
        bind_updateFranchise_buttons();

      } else {
        console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));
  });
  
  Array.from(document.getElementsByClassName("searchButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      document.getElementById("searchResults").style.display = "block";
    })
  });
}

// run this every time a Title search is made
function bind_updateTitle_buttons() {
  // get list of platforms, franchises, and devs
  var req = new XMLHttpRequest();
  payload = {"action": "updateTitleElements"};
  req.open('POST', '/update', true);
  req.setRequestHeader('Content-Type', 'application/json');

  req.addEventListener('load', function(){
    if (req.status >= 200 && req.status < 400) {
      res = JSON.parse(req.responseText);
    } else {
        console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));

  // clicking update/edit buttons make cells editable and show the "Save Changes" button instead
  Array.from(document.getElementsByClassName("updateTitleButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
        // change displayed button to Save Changes
        event.target.style.display = "none";
        event.target.nextElementSibling.style.display = "inline";

        // make the row's attributes edit-able
        var row_element = event.target.parentNode.parentNode;
        var cell_elements = row_element.childNodes;

        // name text input
        var td_cell = document.createElement('td');
        var update_name = document.createElement('input');
        update_name.setAttribute("type", "text");
        update_name.setAttribute("value", row_element.childNodes[0].textContent);
        td_cell.appendChild(update_name);
        row_element.replaceChild(td_cell, cell_elements[0]);

        // platform list options
        var plat_elements = res["Plats"];
        td_cell = document.createElement('td');
        td_cell.style.textAlign = "left";

          //*** platform names isn't showing on webpage, but it is in the HTML ***
        var plat_option = document.createElement("input");
        plat_option.setAttribute("type", "checkbox");
        plat_option.setAttribute("value", plat_elements[0][0]);
        plat_option.textContent = plat_elements[0][1];
        td_cell.appendChild(plat_option);
        for (var i = 1; i < plat_elements.length; i++) {
          var break_tag = document.createElement("br");
          td_cell.appendChild(break_tag);

          plat_option = document.createElement("input");
          plat_option.setAttribute("type", "checkbox");
          plat_option.setAttribute("value", plat_elements[i][0]);
          plat_option.textContent = plat_elements[i][1];
          td_cell.appendChild(plat_option);
        }
          // set default selections to original values
        var curr_plats = cell_elements[1].childNodes[0].childNodes;
        for (var i = 0; i < curr_plats.length; i++) {
          var index = 0;
          while (curr_plats[i].textContent != td_cell.childNodes[index].textContent) {
            index++;
          }
          td_cell.childNodes[index].setAttribute("checked", true);
        }

        row_element.replaceChild(td_cell, cell_elements[1]);

        //***
        // release date selection
        td_cell = document.createElement('td');
        var update_date = document.createElement('input');
        update_date.setAttribute("type", "date");

        // if we can get the search to display the date as yyyy-mm-dd, we can fill this with "cell_elements[2].textContent"
        update_date.defaultValue = "1993-10-26";
        // otherwise, we have to use this and build up the date string
        //console.log(cell_elements[2].textContent.split(" "));

        td_cell.appendChild(update_date);
        row_element.replaceChild(td_cell, cell_elements[2]);
        //***

        // genre options
        var genre_elements = ["Action", "Action-Adventure", "Adventure", "Battle Royale", "Fighting", "First-Person Shooter",
                              "Massively Multiplayer Online Games", "Multiplayer Online Battle Arena", "Platformer", "Racing",
                              "Real-Time Strategy", "Role-Playing Games", "Sandbox/Open World", "Simulation", "Sports",
                              "Strategy", "Survival", "Third-Person Shooter", "Other"];
        td_cell = document.createElement('td');
        var update_genre = document.createElement('select');
        var genre_option = document.createElement('option');
        update_genre.appendChild(genre_option);
        for (var i = 0; i < genre_elements.length; i++) {
          genre_option = document.createElement('option');
          genre_option.setAttribute("value", genre_elements[i]);
          genre_option.textContent = genre_elements[i];
          update_genre.appendChild(genre_option);
        }
        td_cell.appendChild(update_genre);
          // set default selection to original value
        if (cell_elements[3].textContent != "") {
          var index = 1;
          while (cell_elements[3].textContent != update_genre.childNodes[index].value) {
            index++;
          }
          update_genre.childNodes[index].selected = true;
        }
        row_element.replaceChild(td_cell, cell_elements[3]);

        // franchise options
        var franchise_elements = res["Franchises"];
        td_cell = document.createElement('td');
        var update_franchise = document.createElement('select');
        var franchise_option = document.createElement('option');
        update_franchise.appendChild(franchise_option);
        for (var i = 0; i < franchise_elements.length; i++) {
          franchise_option = document.createElement('option');
          franchise_option.setAttribute("value", franchise_elements[i][0]);
          franchise_option.textContent = franchise_elements[i][1];
          update_franchise.appendChild(franchise_option);
        }
        td_cell.appendChild(update_franchise);
          // set default selection to original value
        if (cell_elements[4].textContent != "") {
          var index = 1;
          while (cell_elements[4].textContent != update_franchise.childNodes[index].textContent) {
            index++;
          }
          update_franchise.childNodes[index].selected = true;
        }
        row_element.replaceChild(td_cell, cell_elements[4]);

        // developer options
        var dev_elements = res["Devs"];
        td_cell = document.createElement('td');
        var update_dev = document.createElement('select');
        var dev_option = document.createElement('option');
        update_dev.appendChild(dev_option);
        for (var i = 0; i < dev_elements.length; i++) {
          dev_option = document.createElement('option');
          dev_option.setAttribute("value", dev_elements[i][0]);
          dev_option.textContent = dev_elements[i][1];
          update_dev.appendChild(dev_option);
        }
        td_cell.appendChild(update_dev);
          // set default selection to original value
        if (cell_elements[5].textContent != "") {
          var index = 1;
          while (cell_elements[5].textContent != update_dev.childNodes[index].textContent) {
            index++;
          }
          update_dev.childNodes[index].selected = true;
        }
        row_element.replaceChild(td_cell, cell_elements[5]);

        // ESRB options
        var esrb_values = ["E", "T", "M"];
        var esrb_texts = ["E - Everyone", "T - Teen", "M - Mature"];
        td_cell = document.createElement('td');
        var update_esrb = document.createElement('select');
        var esrb_option = document.createElement('option');
        update_esrb.appendChild(esrb_option);
        for (var i = 0; i < esrb_values.length; i++) {
          esrb_option = document.createElement('option');
          esrb_option.setAttribute("value", esrb_values[i]);
          esrb_option.textContent = esrb_texts[i];
          update_esrb.appendChild(esrb_option);
        }
        td_cell.appendChild(update_esrb);
          // set default selection to original value
        if (cell_elements[6].textContent != "") {
          var index = 1;
          while (cell_elements[6].textContent != update_esrb.childNodes[index].value) {
            index++;
          }
          update_esrb.childNodes[index].selected = true;
        }
        row_element.replaceChild(td_cell, cell_elements[6]);
    });
  });

  // executes UPDATE query with inputs
  Array.from(document.getElementsByClassName("saveTitleButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      // get input values
      // try query

      //if successful
      // make the cells not editable
      // change displayed button to Update/Edit
      event.target.style.display = "none";
      event.target.previousElementSibling.style.display = "inline";

      // show update successful message
      document.getElementById("updateSuccessful").style.display = "block";
      setTimeout(function() {
        document.getElementById("updateSuccessful").style.display = "none";
      }, 1500);

      // not successful
      // show update failed message
      document.getElementById("updateFailed").style.display = "block";
      setTimeout(function() {
        document.getElementById("updateFailed").style.display = "none";
      }, 1500);
    });
  });
}

// run this every time a Deveveloper search is made
function bind_updateDev_buttons() {
  Array.from(document.getElementsByClassName("updateDevButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
        // change displayed button to Save Changes
        event.target.style.display = "none";
        event.target.nextElementSibling.style.display = "inline";

        // make the row's attributes edit-able
        var row_element = event.target.parentNode.parentNode;
        var cell_elements = row_element.childNodes;

        // name text input
        var td_cell = document.createElement('td');
        var update_name = document.createElement('input');
        update_name.setAttribute("type", "text");
        update_name.setAttribute("value", row_element.childNodes[0].textContent);
        td_cell.appendChild(update_name);
        row_element.replaceChild(td_cell, cell_elements[0]);

        // country input
        country_elements = ["Australia", "Canada", "China", "Finland", "France", "German", "Italy",
                            "Japan", "Netherlands", "Poland", "Russia", "South Korea", "Spain",
                            "Sweden", "UK", "USA"];
        td_cell = document.createElement('td');
        var update_country = document.createElement('select');
        var country_option = document.createElement('option');
        update_country.appendChild(country_option);
        for (var i = 0; i < country_elements.length; i++) {
          country_option = document.createElement('option');
          country_option.setAttribute("value", country_elements[i]);
          country_option.textContent = country_elements[i];
          update_country.appendChild(country_option);
        }
        td_cell.appendChild(update_country);
          // set default selection to original value
        if (cell_elements[1].textContent != "") {
          var index = 1;
          while (cell_elements[1].textContent != update_country.childNodes[index].value) {
            index++;
          }
          update_country.childNodes[index].selected = true;
        }
        row_element.replaceChild(td_cell, cell_elements[1]);

        //***
        // date founded selection
        td_cell = document.createElement('td');
        var update_date = document.createElement('input');
        update_date.setAttribute("type", "date");

        // if we can get the search to display the date as yyyy-mm-dd, we can fill this with "cell_elements[2].textContent"
        update_date.defaultValue = "1993-10-26";
        // otherwise, we have to use this and build up the date string
        //console.log(cell_elements[2].textContent.split(" "));

        td_cell.appendChild(update_date);
        row_element.replaceChild(td_cell, cell_elements[2]);
        //***
    });
  });

  // executes UPDATE query with inputs
  Array.from(document.getElementsByClassName("saveDevButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      // get input values
      // try query

      //if successful
      // make the cells not editable
      // change displayed button to Update/Edit
      event.target.style.display = "none";
      event.target.previousElementSibling.style.display = "inline";

      // show update successful message
      document.getElementById("updateSuccessful").style.display = "block";
      setTimeout(function() {
        document.getElementById("updateSuccessful").style.display = "none";
      }, 1500);

      // not successful
      // show update failed message
      document.getElementById("updateFailed").style.display = "block";
      setTimeout(function() {
        document.getElementById("updateFailed").style.display = "none";
      }, 1500);
    });
  });
}

// run this every time a Platform search is made
function bind_updatePlat_buttons() {
  Array.from(document.getElementsByClassName("updatePlatButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
        // change displayed button to Save Changes
        event.target.style.display = "none";
        event.target.nextElementSibling.style.display = "inline";

        // make the row's attributes edit-able
        var row_element = event.target.parentNode.parentNode;
        var cell_elements = row_element.childNodes;

        // name text input
        var td_cell = document.createElement('td');
        var update_name = document.createElement('input');
        update_name.setAttribute("type", "text");
        update_name.setAttribute("value", row_element.childNodes[0].textContent);
        td_cell.appendChild(update_name);
        row_element.replaceChild(td_cell, cell_elements[0]);

        //***
        // release date selection
        td_cell = document.createElement('td');
        var update_date = document.createElement('input');
        update_date.setAttribute("type", "date");

        // if we can get the search to display the date as yyyy-mm-dd, we can fill this with "cell_elements[2].textContent"
        update_date.defaultValue = "1993-10-26";
        // otherwise, we have to use this and build up the date string
        //console.log(cell_elements[1].textContent.split(" "));

        td_cell.appendChild(update_date);
        row_element.replaceChild(td_cell, cell_elements[1]);
        //***

        // developer input
        dev_elements = ["Atari", "Google", "Microsoft", "Nintendo", "Sega", "Sony"];
        td_cell = document.createElement('td');
        var update_dev = document.createElement('select');
        for (var i = 0; i < dev_elements.length; i++) {
          var dev_option = document.createElement('option');
          dev_option.setAttribute("value", dev_elements[i]);
          dev_option.textContent = dev_elements[i];
          update_dev.appendChild(dev_option);
        }
        td_cell.appendChild(update_dev);
          // set default selection to original value
        if (cell_elements[2].textContent != "") {
          var index = 0;
          while (cell_elements[2].textContent != update_dev.childNodes[index].value) {
            index++;
          }
          update_dev.childNodes[index].selected = true;
        }
        row_element.replaceChild(td_cell, cell_elements[2]);

        // in production input
        inProd_elements = ["Y", "N"];
        td_cell = document.createElement('td');
        var update_inProd = document.createElement('select');
        for (var i = 0; i < inProd_elements.length; i++) {
          var inProd_option = document.createElement('option');
          inProd_option.setAttribute("value", inProd_elements[i]);
          inProd_option.textContent = inProd_elements[i];
          update_inProd.appendChild(inProd_option);
        }
        td_cell.appendChild(update_inProd);
          // set default selection to original value
        if (cell_elements[3].textContent != "") {
          var index = 0;
          console.log(update_inProd.childNodes[index].textContent);
          while (cell_elements[3].textContent != update_inProd.childNodes[index].textContent) {
            index++;
          }
          update_inProd.childNodes[index].selected = true;
        }
        row_element.replaceChild(td_cell, cell_elements[3]);
    });
  });

  // executes UPDATE query with inputs
  Array.from(document.getElementsByClassName("savePlatButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      // get input values
      // try query

      //if successful
      // make the cells not editable
      // change displayed button to Update/Edit
      event.target.style.display = "none";
      event.target.previousElementSibling.style.display = "inline";

      // show update successful message
      document.getElementById("updateSuccessful").style.display = "block";
      setTimeout(function() {
        document.getElementById("updateSuccessful").style.display = "none";
      }, 1500);

      // not successful
      // show update failed message
      document.getElementById("updateFailed").style.display = "block";
      setTimeout(function() {
        document.getElementById("updateFailed").style.display = "none";
      }, 1500);
    });
  });
}

// run this every time a Franchise search is made
function bind_updateFranchise_buttons() {
  Array.from(document.getElementsByClassName("updateFranchiseButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
        // change displayed button to Save Changes
        event.target.style.display = "none";
        event.target.nextElementSibling.style.display = "inline";

        // make the row's attributes edit-able
        var row_element = event.target.parentNode.parentNode;
        var cell_elements = row_element.childNodes;

        // name text input

        // developer input

    });
  });

  // executes UPDATE query with inputs
  Array.from(document.getElementsByClassName("saveFranchiseButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      //if successful
      // make the cells not editable
      // change displayed button to Update/Edit
      event.target.style.display = "none";
      event.target.previousElementSibling.style.display = "inline";

      // show update successful message
      document.getElementById("updateSuccessful").style.display = "block";
      setTimeout(function() {
        document.getElementById("updateSuccessful").style.display = "none";
      }, 1500);

      // not successful
      // show update failed message
      document.getElementById("updateFailed").style.display = "block";
      setTimeout(function() {
        document.getElementById("updateFailed").style.display = "none";
      }, 1500);
    });
  });
}