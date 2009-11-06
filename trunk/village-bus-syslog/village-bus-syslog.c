/**
 * Afrimesh: easy management for B.A.T.M.A.N. wireless mesh networks
 * Copyright (C) 2008-2009 Meraka Institute of the CSIR
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */


#include <fcntl.h>
#include <errno.h>
#include <sys/types.h>

#include "village-bus-syslog.h"


struct json_object* die_gracefully(FILE* file, struct json_object* error)
{
  fclose(file);
  return error;
}


typedef struct {
  char* timestamp;
  char* level;
  char* address;
  char* process;
  char* message;
} LogEntry;

// Jan  3 05:27:58 <user.notice> 192.168.20.2 root: Hello englishman again 
char* parse_timestamp(const char* input, size_t length)
{
  // space space : : space
  char* cursor = input;
  for (cursor = input; cursor != NULL && cursor != (input + length); cursor++) {
    
  }
  return input;
}

char* parse_level(const char* input)
{
  // < . > space
  return input;
}

char* parse_node(const char* input)
{
  // space
  return input;
}

char* parse_process(const char* input)
{
  // colon space
  return input;
}

char* parse_message(const char* input)
{
  // eol
  return input;
}

LogEntry parse_entry(const char* input, size_t length)
{
  LogEntry entry;

  entry.timestamp = parse_timestamp(input, length);

  //  printf("\ttimestamp: %s\n", entry.timestamp);

  return entry;
}


struct json_object* readlog(int n)
{
  size_t readsize = 256;
  char   buffer[readsize];
  struct json_object* entries = json_object_new_array();

  /* TODO - find logfile */
  const char* name = "/var/log/system.log";
  //const char* name = "/var/log/messages";

  /* open logfile */
  FILE* logfile = fopen(name, "r");
  if (!logfile) {
    return jsonrpc_error("Failed to open system log: %s", strerror(errno));
  }

  /* find eof */
  if (fseek(logfile, 0, SEEK_END) == -1) {
    return die_gracefully(logfile, jsonrpc_error("Seek failed - %s", strerror(errno)));
  }
  long eof = ftell(logfile);
  if (eof == -1) {
    return die_gracefully(logfile, jsonrpc_error("Could not locate end of logfile - %s", strerror(errno)));
  }
  
  long eol = eof;
  size_t lines = 0;
  for (lines = 0; lines < n; lines++) {

    /* go to last known line end & read previous 'readsize' bytes */
    if (fseek(logfile, eol - readsize, SEEK_SET) == -1) {
      return die_gracefully(logfile, jsonrpc_error("Seek failed - %s", strerror(errno)));
    }
    size_t bytesread = fread(buffer, 1, readsize, logfile);
    if (bytesread == -1) {
      return die_gracefully(logfile, jsonrpc_error("Read failed - %s", strerror(errno)));
    }
    buffer[bytesread] = 0;

    /* read buffer backward until there's a newline */
    char* start;
    for (start = buffer + bytesread - 2; start != buffer; start--) {
      if (*start == '\n') {
        break;
      }
    }

    /* everything between here and end of buffer is the line */
    size_t line_length = (buffer + bytesread) - start;
    start[line_length] = 0;
    /* TODO - parse line */
    //printf("-> %d : |%s|\n", lines, start + 1);
    LogEntry entry = parse_entry(start + 1, strlen(start + 1));
    json_object_array_add(entries, json_object_new_string(start + 1));
    
    
    /* move last known eol backward */
    eol = eol - line_length;
  }

  /* cleanup */
  if (fclose(logfile) != 0) {
    return jsonrpc_error("Error closing system log: %s", strerror(errno));
  }

  struct json_object* response = json_object_new_object();
  json_object_object_add(response, "result", entries);
  return response;
}


  /*
  printf("%s\n\n", buffer);*/
  /*char* line;
  size_t length;
  int lineno = 0;
  while ((line = fgetln(logfile, &length)) != NULL) {
    line[length-1] = 0;
    printf("-> %d: %s\n", lineno++, line);
  }*/


  
  /* read last 'readsize' bytes of file */
  /*if (fseek(logfile, eof - readsize, SEEK_SET) == -1) {
    return die_gracefully(logfile, jsonrpc_error("Seek failed - %s", strerror(errno)));
    }*/

