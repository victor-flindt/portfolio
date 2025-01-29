package main

import (
	"html/template"
	"net/http"
)

func main() {
	// Handle static files
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Define handlers
	http.HandleFunc("/", makeHandler("home.html"))
	http.HandleFunc("/about", makeHandler("about.html"))
	http.HandleFunc("/projects", makeHandler("projects.html"))
	http.HandleFunc("/contact", makeHandler("contact.html"))

	// Start server
	http.ListenAndServe(":8080", nil)
}

// Helper function to create handlers
func makeHandler(tmpl string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		t, err := template.ParseFiles(
			"templates/base.html",
			"templates/"+tmpl,
		)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// You can pass data to templates here
		data := struct {
			Title string
		}{
			Title: tmpl[:len(tmpl)-5], // Remove ".html" extension
		}

		t.Execute(w, data)
	}
}
