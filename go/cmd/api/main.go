package main

import (
	"github.com/Jyury11/go-next-portfolio/cmd/api/di"
)

func main() {
	handler, cleanUp, err := di.InitializeMysqlAPI()
	if err != nil {
		panic(err)
	}
	defer cleanUp()

	err = handler.Run()
	if err != nil {
		panic(err)
	}
}
