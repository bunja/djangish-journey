
      // get search form and page links
      let searchForm = document.getElementById('searchForm')
      let pageLinks = document.getElementsByClassName('page-link')

      // Ensure search form exists
      if(searchForm){
        for(let i = 0; pageLinks.length > 1; i++ ){
          pageLinks[i].addEventListener('click', function(e) {
            e.preventDefault()
            // get the data attr
            let page = this.dataset.page
            console.log("page:", page)
            // add hidden search input to form
            searchForm.innerHTML += `<input value=${page} name="page" hiddesn/>`
            // Submit form
            searchForm.submit()
          })
        }
      }

      let tags = document.getElementsByClassName('project-tag')

      for (let i=0; tags.length > i; i++){
          tags[i].addEventListener('click', (e) => {
              let tagId = e.target.dataset.tag
              let projectId = e.target.dataset.project
  
              // console.log('tag id', tagId, 'projectId', projectId)
              fetch('http://127.0.0.1:5000/api/remove-tag/', {
                  method: 'DELETE',
                  headers: {
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({'project':projectId, 'tag':tagId})
  
               })
               .then( res => res.json())
               .then( data => {
                   e.target.remove()
               })
          })
      }
    