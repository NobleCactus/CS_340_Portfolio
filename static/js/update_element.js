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
        
        header_td = document.createElement('th');
        header_td.textContent = 'Title'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Platforms'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.innerHTML = 'Release Date<br/>(North America)'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Genre'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Franchise'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Developer'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'ESRB Rating'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Update/Edit?'
        header_tr.appendChild(header_td);

        searchTable.appendChild(header_tr);

        // add each row into the search result table
        for (var i = 0; i < res.length; i++) {
          title_tr = document.createElement('tr');
          title_tr.setAttribute('class', 'searchResultRow');
          
          name_val = document.createElement('td');
          name_val.textContent = res[i][1];
          title_tr.appendChild(name_val);

          plat_val = document.createElement('td');
          plat_list = document.createElement('ul');
          plat_list.setAttribute('class', 'platformList');
          for (var j = 0; j < res[i][7].length; j++) {
            plat_item = document.createElement('li');
            plat_item.textContent = res[i][7][j];
            plat_list.appendChild(plat_item);
          }
          plat_val.appendChild(plat_list);
          title_tr.appendChild(plat_val);

          release_val = document.createElement('td');
          release_val.textContent = res[i][2];
          title_tr.appendChild(release_val);

          genre_val = document.createElement('td');
          genre_val.textContent = res[i][3];
          title_tr.appendChild(genre_val);

          franchise_val = document.createElement('td');
          franchise_val.textContent = res[i][4];
          title_tr.appendChild(franchise_val);

          dev_val = document.createElement('td');
          dev_val.textContent = res[i][5];
          title_tr.appendChild(dev_val);

          esrb_val = document.createElement('td');
          esrb_val.textContent = res[i][6];
          title_tr.appendChild(esrb_val);

          // update button
          button_td = document.createElement('td');
          update_button = document.createElement('button');
          update_button.setAttribute('type', 'button');
          update_button.setAttribute('class', 'updateButton');
          update_button.setAttribute('value', res[i][0]);
          update_button.textContent = "Update/Edit";
          button_td.appendChild(update_button);

          // save button
          save_button = document.createElement('button');
          save_button.setAttribute('type', 'button');
          save_button.setAttribute('class', 'saveButton');
          save_button.textContent = "Save Changes";
          button_td.appendChild(save_button);
          
          title_tr.appendChild(button_td);

          searchTable.appendChild(title_tr);
        }

        // rebind the new update buttons to trigger update query
        bind_update_buttons();

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
        
        // add appropriate header rows for Titles table
        header_tr = document.createElement('tr');
        header_tr.setAttribute('class', 'searchResultRow');
        
        header_td = document.createElement('th');
        header_td.textContent = 'Developer Studio'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Country'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Date Founded'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Update/Edit?'
        header_tr.appendChild(header_td);

        searchTable.appendChild(header_tr);

        // add each row into the search result table
        for (var i = 0; i < res.length; i++) {
          title_tr = document.createElement('tr');
          title_tr.setAttribute('class', 'searchResultRow');
          
          name_val = document.createElement('td');
          name_val.textContent = res[i][1];
          title_tr.appendChild(name_val);

          country_val = document.createElement('td');
          country_val.textContent = res[i][2];
          title_tr.appendChild(country_val);

          founded_val = document.createElement('td');
          founded_val.textContent = res[i][3];
          title_tr.appendChild(founded_val);

          // add update button
          button_td = document.createElement('td');
          update_button = document.createElement('button');
          update_button.setAttribute('type', 'button');
          update_button.setAttribute('class', 'updateButton');
          update_button.setAttribute('value', res[i][0]);
          update_button.textContent = "Update/Edit";
          button_td.appendChild(update_button);
          title_tr.appendChild(button_td);

          searchTable.appendChild(title_tr);
        }

        // rebind the new update buttons to trigger update query
        bind_update_buttons();

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
        
        // add appropriate header rows for Titles table
        header_tr = document.createElement('tr');
        header_tr.setAttribute('class', 'searchResultRow');
        
        header_td = document.createElement('th');
        header_td.textContent = 'Platform'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.innerHTML = 'Release Date<br/>(North America)'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Developer'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'In Production'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Update/Edit?'
        header_tr.appendChild(header_td);

        searchTable.appendChild(header_tr);

        // add each row into the search result table
        for (var i = 0; i < res.length; i++) {
          title_tr = document.createElement('tr');
          title_tr.setAttribute('class', 'searchResultRow');
          
          name_val = document.createElement('td');
          name_val.textContent = res[i][1];
          title_tr.appendChild(name_val);

          release_val = document.createElement('td');
          release_val.textContent = res[i][2];
          title_tr.appendChild(release_val);

          dev_val = document.createElement('td');
          dev_val.textContent = res[i][3];
          title_tr.appendChild(dev_val);

          inProd_val = document.createElement('td');
          if (res[i][4]) {
            inProd_val.textContent = "Y"
          } else {
            inProd_val.textContent = "N"
          }
          title_tr.appendChild(inProd_val);

          // add update button
          button_td = document.createElement('td');
          update_button = document.createElement('button');
          update_button.setAttribute('type', 'button');
          update_button.setAttribute('class', 'updateButton');
          update_button.setAttribute('value', res[i][0]);
          update_button.textContent = "Update/Edit";
          button_td.appendChild(update_button);
          title_tr.appendChild(button_td);

          searchTable.appendChild(title_tr);
        }

        // rebind the new update buttons to trigger update query
        bind_update_buttons();

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
        
        // add appropriate header rows for Titles table
        header_tr = document.createElement('tr');
        header_tr.setAttribute('class', 'searchResultRow');
        
        header_td = document.createElement('th');
        header_td.textContent = 'Franchise'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.innerHTML = 'Developer'
        header_tr.appendChild(header_td);

        header_td = document.createElement('th');
        header_td.textContent = 'Update/Edit?'
        header_tr.appendChild(header_td);

        searchTable.appendChild(header_tr);

        // add each row into the search result table
        for (var i = 0; i < res.length; i++) {
          title_tr = document.createElement('tr');
          title_tr.setAttribute('class', 'searchResultRow');
          
          name_val = document.createElement('td');
          name_val.textContent = res[i][1];
          title_tr.appendChild(name_val);

          dev_val = document.createElement('td');
          dev_val.textContent = res[i][2];
          title_tr.appendChild(dev_val);

          // add update button
          button_td = document.createElement('td');
          update_button = document.createElement('button');
          update_button.setAttribute('type', 'button');
          update_button.setAttribute('class', 'updateButton');
          update_button.setAttribute('value', res[i][0]);
          update_button.textContent = "Update/Edit"
          button_td.appendChild(update_button);
          title_tr.appendChild(button_td);

          searchTable.appendChild(title_tr);
        }

        // rebind the new update buttons to trigger update query
        bind_update_buttons();

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

// run this every time the search table is remade to bind newly made buttons
function bind_update_buttons() {
  // update/edit buttons make cells editable and show the "Save Changes" button instead
  Array.from(document.getElementsByClassName("updateButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      // get list of platforms, franchises, and devs
      var req = new XMLHttpRequest();
      payload = {"action": "updateTitleElements"};
      req.open('POST', '/update', true);
      req.setRequestHeader('Content-Type', 'application/json');

      req.addEventListener('load', function(){
        if (req.status >= 200 && req.status < 400) {
          res = JSON.parse(req.responseText);
          // change displayed button to Save Changes
          event.target.style.display = "none";
          event.target.nextElementSibling.style.display = "inline";

          // make the row's attributes edit-able
          var row_element = event.target.parentNode.parentNode;
          var cell_elements = row_element.childNodes;

          // name cell_elements[0]
          td_cell = document.createElement('td');
          update_name = document.createElement('input');
          update_name.type = "text";
          update_name.value = row_element.childNodes[0].textContent;
          td_cell.appendChild(update_name);
          row_element.replaceChild(td_cell, cell_elements[0]);

          // platform list cell_elements[1]

          // release date cell_elements[2]
          td_cell = document.createElement('td');
          update_date = document.createElement('input');
          update_date.type = "date";

          // if we can get the search to display the date correctly, we can fill this with "cell_elements[2].textContent"
          update_date.defaultValue = "1993-10-26";
          // otherwise, we have to use this and buil up the date string
          console.log(cell_elements[2].textContent.split(" "));

          td_cell.appendChild(update_date);
          row_element.replaceChild(td_cell, cell_elements[2]);

          // genre cell_elements[3]
          td_cell = document.createElement('td');
          update_genre = document.createElement('select');
          genre_element = document.createElement('option');
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Action";
          genre_element.textContent = "Action";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Action-Adventure";
          genre_element.textContent = "Action-Adventure";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Adventure";
          genre_element.textContent = "Adventure";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Battle Royale";
          genre_element.textContent = "Battle Royale";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Fighting";
          genre_element.textContent = "Fighting";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "First-Person Shooter";
          genre_element.textContent = "First-Person Shooter";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Massively Multiplayer Online Games";
          genre_element.textContent = "Massively Multiplayer Online Games";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Multiplayer Online Battle Arena";
          genre_element.textContent = "Multiplayer Online Battle Arena";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Platformer";
          genre_element.textContent = "Platformer";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Racing";
          genre_element.textContent = "Racing";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Real-Time Strategy";
          genre_element.textContent = "Real-Time Strategy";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Role-Playing Games";
          genre_element.textContent = "Role-Playing Games";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Sandbox/Open World";
          genre_element.textContent = "Sandbox/Open World";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Simulation";
          genre_element.textContent = "Simulation";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Sports";
          genre_element.textContent = "Sports";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Strategy";
          genre_element.textContent = "Strategy";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Survival";
          genre_element.textContent = "Survival";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Third-Person Shooter";
          genre_element.textContent = "Third-Person Shooter";
          update_genre.appendChild(genre_element);
          genre_element = document.createElement('option');
          genre_element.value = "Other";
          genre_element.textContent = "Other";
          update_genre.appendChild(genre_element);
          td_cell.appendChild(update_genre);

          // default selection is original value
          if (cell_elements[3] != "") {
            var index = 1;
            while (cell_elements[3].textContent != update_genre.childNodes[index].value) {
              index++;
            }
            update_genre.childNodes[index].selected = true;
          }

          row_element.replaceChild(td_cell, cell_elements[3]);

          // franchise cell_elements[4]

          // dev cell_elements[5]

          // esrb cell_elements[6]
          esrb_values = ["E", "T", "M"];
          esrb_texts = ["E - Everyone", "T - Teen", "M - Mature"];
          td_cell = document.createElement('td');
          update_esrb = document.createElement('select');
          esrb_element = document.createElement('option');
          update_esrb.appendChild(esrb_element);

          for (var i = 0; i < esrb_values.length; i++) {
            esrb_element = document.createElement('option');
            esrb_element.value = esrb_values[i];
            esrb_element.textContent = esrb_texts[i];
            console.log(esrb_element);
            update_esrb.appendChild(esrb_element);
          }

          // default selection is original value
          if (cell_elements[6] != "") {
            var index = 1;
            while (cell_elements[6].textContent != update_esrb.childNodes[index].value) {
              index++;
            }
            update_esrb.childNodes[index].selected = true;
          }

          row_element.replaceChild(td_cell, cell_elements[6]);
        } else {
          console.log("Error in network request: " + req.statusText);
        }
      });
      req.send(JSON.stringify(payload));
    });
  });

  // executes UPDATE query with inputs
  Array.from(document.getElementsByClassName("saveButton")).forEach(function(element) {
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
    })
  });
}