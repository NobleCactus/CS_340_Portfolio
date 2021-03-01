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
      // change displayed button to Save Changes
      event.target.style.display = "none";
      event.target.nextElementSibling.style.display = "inline";

      // make the row's attributes edit-able
      var row_element = event.target.parentNode.parentNode;

      // name row_element.childNodes[0]
      update_name = document.createElement('input');
      update_name.type = "text";
      update_name.value = row_element.childNodes[0].value;
      row_element.replaceChild(update_name, row_element.childNodes[0]);

      // platform list row_element.childNodes[1]

      // release date row_element.childNodes[2]

      // genre row_element.childNodes[3]

      // franchise row_element.childNodes[4]

      // dev row_element.childNodes[5]

      // esrb row_element.childNodes[6]

      // buttons row_element.childNodes[7]

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