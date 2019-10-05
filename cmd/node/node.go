// Command gocron-node

package main

import (
	"flag"
	"fmt"
	"os"
	"runtime"
	"strings"

	"github.com/sunny5156/gocronx/internal/modules/rpc/auth"
	"github.com/sunny5156/gocronx/internal/modules/rpc/server"
	"github.com/sunny5156/gocronx/internal/modules/utils"
	"github.com/sunny5156/gotools"
)

var (
	AppVersion, BuildDate, GitCommit string
)

func main() {
	var serverAddr string
	var allowRoot bool
	var version bool
	var CAFile string
	var certFile string
	var keyFile string
	var enableTLS bool
	flag.BoolVar(&allowRoot, "allow-root", false, "./gocronx-node -allow-root")
	flag.StringVar(&serverAddr, "s", "0.0.0.0:5921", "./gocronx-node -s ip:port")
	flag.BoolVar(&version, "v", false, "./gocronx-node -v")
	flag.BoolVar(&enableTLS, "enable-tls", false, "./gocronx-node -enable-tls")
	flag.StringVar(&CAFile, "ca-file", "", "./gocronx-node -ca-file path")
	flag.StringVar(&certFile, "cert-file", "", "./gocronx-node -cert-file path")
	flag.StringVar(&keyFile, "key-file", "", "./gocronx-node -key-file path")
	flag.Parse()

	if version {
		gotools.PrintAppVersion(AppVersion, GitCommit, BuildDate)
		return
	}

	if enableTLS {
		if !utils.FileExist(CAFile) {
			fmt.Printf("failed to read ca cert file: %s", CAFile)
			return
		}
		if !utils.FileExist(certFile) {
			fmt.Printf("failed to read server cert file: %s", certFile)
			return
		}
		if !utils.FileExist(keyFile) {
			fmt.Printf("failed to read server key file: %s", keyFile)
			return
		}
	}

	certificate := auth.Certificate{
		CAFile:   strings.TrimSpace(CAFile),
		CertFile: strings.TrimSpace(certFile),
		KeyFile:  strings.TrimSpace(keyFile),
	}

	if runtime.GOOS != "windows" && os.Getuid() == 0 && !allowRoot {
		fmt.Println("Do not run gocron-node as root user")
		return
	}

	server.Start(serverAddr, enableTLS, certificate)
}
