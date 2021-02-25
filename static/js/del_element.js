document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
  document.getElementById("selTitleSearch").addEventListener("click", function(event){
    document.getElementById("delDevSearch").style.display = "none";
    document.getElementById("delPlatSearch").style.display = "none";
    document.getElementById("delFranchiseSearch").style.display = "none";

    document.getElementById("delTitleSearch").style.display = "block";

    document.getElementById("delSuccessful").style.display = "none"
  });

  document.getElementById("selDevSearch").addEventListener("click", function(event){
    document.getElementById("delTitleSearch").style.display = "none";
    document.getElementById("delPlatSearch").style.display = "none";
    document.getElementById("delFranchiseSearch").style.display = "none";

    document.getElementById("delDevSearch").style.display = "block";

    document.getElementById("delSuccessful").style.display = "none"
  });

  document.getElementById("selPlatSearch").addEventListener("click", function(event){
    document.getElementById("delTitleSearch").style.display = "none";
    document.getElementById("delDevSearch").style.display = "none";
    document.getElementById("delFranchiseSearch").style.display = "none";

    document.getElementById("delPlatSearch").style.display = "block";

    document.getElementById("delSuccessful").style.display = "none"
  });

  document.getElementById("selFranchiseSearch").addEventListener("click", function(event){
    document.getElementById("delTitleSearch").style.display = "none";
    document.getElementById("delDevSearch").style.display = "none";
    document.getElementById("delPlatSearch").style.display = "none";

    document.getElementById("delFranchiseSearch").style.display = "block";

    document.getElementById("delSuccessful").style.display = "none"
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

    req.open('POST', '/delete', true);
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
        header_td.textContent = 'Delete?'
        header_tr.appendChild(header_td);

        searchTable.appendChild(header_tr);

        // add each row into the search result table
        for (var i = 0; i < res.length; i++) {
          title_tr = document.createElement('tr');
          title_tr.setAttribute('class', 'searchResultRow');
          
          name_val = document.createElement('td');
          name_val.textContent = res[i][1];
          title_tr.appendChild(name_val);

          // replace this with unordered list of platforms from TitlesPlatforms query
          plat_val = document.createElement('td');
          plat_val.textContent = "Platform List Query Results";
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

          // add delete button
          button_td = document.createElement('td');
          del_button = document.createElement('button');
          del_button.setAttribute('type', 'button');
          del_button.setAttribute('class', 'delButton');
          del_button.setAttribute('value', res[i][0]);
          del_button.textContent = "Delete"
          button_td.appendChild(del_button);
          title_tr.appendChild(button_td);

          searchTable.appendChild(title_tr);
        }

        // rebind the new delete butons to trigger delete query
        bind_delete_buttons();

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

    req.open('POST', '/delete', true);
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
        header_td.textContent = 'Delete?'
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

          // add delete button
          button_td = document.createElement('td');
          del_button = document.createElement('button');
          del_button.setAttribute('type', 'button');
          del_button.setAttribute('class', 'delButton');
          del_button.setAttribute('value', res[i][0]);
          del_button.textContent = "Delete"
          button_td.appendChild(del_button);
          title_tr.appendChild(button_td);

          searchTable.appendChild(title_tr);
        }

        // rebind the new delete butons to trigger delete query
        bind_delete_buttons();

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
    req.open('POST', '/delete', true);
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
        header_td.textContent = 'Delete?'
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
          inProd_val.textContent = res[i][4];
          title_tr.appendChild(inProd_val);

          // add delete button
          button_td = document.createElement('td');
          del_button = document.createElement('button');
          del_button.setAttribute('type', 'button');
          del_button.setAttribute('class', 'delButton');
          del_button.setAttribute('value', res[i][0]);
          del_button.textContent = "Delete"
          button_td.appendChild(del_button);
          title_tr.appendChild(button_td);

          searchTable.appendChild(title_tr);
        }

        // rebind the new delete butons to trigger delete query
        bind_delete_buttons();

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
    req.open('POST', '/delete', true);
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
        header_td.textContent = 'Delete?'
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

          // add delete button
          button_td = document.createElement('td');
          del_button = document.createElement('button');
          del_button.setAttribute('type', 'button');
          del_button.setAttribute('class', 'delButton');
          del_button.setAttribute('value', res[i][0]);
          del_button.textContent = "Delete"
          button_td.appendChild(del_button);
          title_tr.appendChild(button_td);

          searchTable.appendChild(title_tr);
        }

        // rebind the new delete butons to trigger delete query
        bind_delete_buttons();

      } else {
        console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));
  });

  
  bind_delete_buttons();

  // 
  Array.from(document.getElementsByClassName("searchButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      document.getElementById("searchResults").style.display = "block"
    })
  });
}

// run this every time the search table is remade to bind newly made buttons
function bind_delete_buttons() {
  Array.from(document.getElementsByClassName("delButton")).forEach(function(element) {
    element.addEventListener("click", function(event) {
      if (confirm('Are you sure you want to delete this from the database?')) {
        // POST with button's value, which is the row's ID (event.target.value)

        // if successful:
        document.getElementById("delSuccessful").style.display = "block";
          setTimeout(function() {
          document.getElementById("delSuccessful").style.display = "none"
          }, 1500);
      } 
    })
  });
}