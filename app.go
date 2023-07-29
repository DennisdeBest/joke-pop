package main

import (
	"context"
	"flag"
	"fmt"
	"github.com/dennisdebest/joke-fetcher/api"
	"os"
)

var Version = "development"

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	var showVersion bool
	flag.BoolVar(&showVersion, "version", false, "display version number")
	flag.Parse()
	if showVersion {
		fmt.Printf("App version : %s", Version)
		os.Exit(0)
	}
	a.ctx = ctx
}

func (a *App) Joke(name string) (string, error) {
	joke, err := api.CallApiByName(name, false)
	return joke, err
}

func (a *App) GetApis() api.Apis {
	api.GetApis()
	return api.ListApis
}
