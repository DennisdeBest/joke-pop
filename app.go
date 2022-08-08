package main

import (
	"context"
	"github.com/dennisdebest/joke-fetcher/api"
)

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
	a.ctx = ctx
}

func (a *App) Joke(name string) string {
	return api.CallApiByName(name, false)
}

func (a *App) GetApis() api.Apis {
	api.GetApis()
	return api.ListApis
}
