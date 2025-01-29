package main

import (
	"fmt"
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
	var PORT string = ":8080"
	fmt.Println("Starting server at port" + PORT)
	http.ListenAndServe(PORT, nil)
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

		data := struct {
			Title      string
			ActivePage string
		}{
			Title:      tmpl[:len(tmpl)-5], // Remove ".html" extension
			ActivePage: tmpl[:len(tmpl)-5], // "home", "about", etc.
		}

		t.Execute(w, data)
	}
}
